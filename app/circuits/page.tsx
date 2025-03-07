'use client'

import { useEffect, useState } from 'react';
import { Circuit, EnrichedCircuit, Exercise } from '@/app/lib/definitions';
import { fetchCircuitExercises, fetchCircuits, updateCircuitsWithExercises } from '../lib/data';


export default function CircuitsPage(){
  const [circuits, setCircuits] = useState<EnrichedCircuit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetData = async () => {
        try{            
            const circuitData: Circuit[] = await fetchCircuits();
            const enrichedCircuits = await updateCircuitsWithExercises(circuitData);
            setCircuits(enrichedCircuits)
        } catch(error){
            console.error("Failed to fetch data:", error);
        }  finally {
            setLoading(false);
          }
    };

    fetchAndSetData();
  }, []);

  if (loading) return <div>Loading...</div>;

  console.log(circuits)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Circuits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {circuits
          .sort((a, b) => a.index - b.index)
          .map((circuit) => (
            <div key={circuit.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{circuit.name}</h2>
              <p className="text-gray-500 text-sm">
                {circuit.type === 'laps' ? `Laps: ${circuit.laps}` : `Duration: ${circuit.duration}s`}
              </p>
              <h3 className="mt-2 font-semibold">Exercises:</h3>
              <ul className="list-disc pl-4 text-sm">
                {circuit.exercises.map((exercise) => (
                  <li key={exercise?.id}>
                    {exercise.exerciseDetails?.name || 'Loading...'} 
                    {exercise.reps || exercise.duration}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};
