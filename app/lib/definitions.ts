// This file contains type definitions for the data.

export type Exercise = {
  id: string,
  name: string,
  video: string,
  instructions: string,
  equipment: string[]
}

export type Circuit = {
  id: string,
  name: string,
  index: number,
  exercises: RawCircuitExercise[],
  type: 'laps' | 'timer',
  laps?: number,
  duration?: number
}

export type RawCircuitExercise = {
  id: string;
  order: number;
  reps?: number;
  duration?: number;
}

// AFTER fetching full exercise details
export type CircuitExercise = RawCircuitExercise & {
  exerciseDetails?: Exercise; // Fetched separately
};

// AFTER fetching exercises (UI-ready)
export type EnrichedCircuit = Omit<Circuit, 'exercises'> & {
  exercises: CircuitExercise[];
};

type Workout = {
  id: string,
  name: string,
  circuits: string[]
}