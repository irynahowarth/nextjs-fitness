import { db } from "@/firebase"
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Circuit, Exercise, CircuitExercise, EnrichedCircuit, RawCircuitExercise } from "./definitions";

export async function fetchExercises():Promise<Exercise[]> {
    try{
      const exerciseCollection = collection(db, "exercises");
      const exerciseSnapshot = await getDocs(exerciseCollection);
      const exerciseData: Exercise[] = exerciseSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Exercise[];
      return exerciseData
    } catch (error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch exercises.');
    }
}

export async function fetchCircuits():Promise<Circuit[]> {
    try{
      const circuitCollection = collection(db, "circuits");
      const circuitSnapshot = await getDocs(circuitCollection);
      const circuitData: Circuit[] = circuitSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Circuit[];
      return circuitData
    } catch (error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch circuits.');
    }
}

export async function fetchCircuitExercises(
    exercises: RawCircuitExercise[])
    :Promise<CircuitExercise[]>{

// Collect unique exercise IDs
const exerciseIds = new Set(exercises.map(ex => ex.id));

 // Fetch exercises from Firestore
 const exercisePromises = Array.from(exerciseIds).map(async (id) => {
   const exerciseDoc = await getDoc(doc(db, 'exercises', id));
   if (exerciseDoc.exists()) {
    return { id, ...exerciseDoc.data() } as Exercise;
  } else {
    console.warn(`Exercise with ID ${id} not found.`);
    return null; 
  }
 });

 // Resolve all promises and filter out null values
 const exerciseData = (await Promise.all(exercisePromises)).filter(Boolean) as Exercise[];

 // Create a map for easy lookup
 const exerciseMap: Record<string, Exercise> = {};
 exerciseData.forEach((exercise) => {
   exerciseMap[exercise.id] = exercise;
 });

// Return updated exercises with details
return exercises.map(ex => ({
    ...ex,
    exerciseDetails: exerciseMap[ex.id] || null
  }));
}

export async function updateCircuitsWithExercises(circuitList: Circuit[]): Promise<EnrichedCircuit[]> {
    // Fetch exercises for all circuits
    const updatedCircuits = await Promise.all(
      circuitList.map(async (circuit) => {
        const updatedExercises: CircuitExercise[] = await fetchCircuitExercises(circuit.exercises);
        return {
          ...circuit,
          exercises: updatedExercises.sort((a, b) => a.order - b.order) // Ensure correct order
        };
      })
    );
  
    return updatedCircuits;
  }