'use client'

import { useEffect, useState } from 'react';
import { Exercise } from '@/app/lib/definitions';
import { fetchExercises } from '../lib/data';


export default function ExercisesPage(){
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetData = async () => {
        try{
            const exerciseData = await fetchExercises();
            setExercises(exerciseData)
        } catch(error){
            console.error("Failed to fetch data:", error);
        }  finally {
            setLoading(false);
          }
    };

    fetchAndSetData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{exercise.name}</h2>
            <p className="text-sm text-gray-500">{exercise.instructions}</p>
            <div className="mt-4">
              <p className="font-semibold">Equipment:</p>
              <ul className="list-disc pl-4">
                {exercise.equipment.map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <a
                href={exercise.video}
                target="_blank"
                className="text-blue-500 hover:underline"
                rel="noopener noreferrer"
              >
                Watch Exercise Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
