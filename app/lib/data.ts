import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore";
import { Exercise } from "./definitions";

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
