'use client'

import { useEffect, useState } from 'react';
import { Workout } from '@/app/lib/definitions';
import { fetchWorkouts } from '../lib/data';


export default function WorkoutsPage(){
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetData = async () => {
        try{
            const workoutData = await fetchWorkouts();
            setWorkouts(workoutData)
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
      <h1 className="text-2xl font-bold mb-4">Workouts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{workout.name}</h2>
            <p className="text-sm text-gray-500">Circuits: {workout.circuits.length}</p>
            <button
              onClick={() => alert('Navigate to workout session')}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Start Workout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
