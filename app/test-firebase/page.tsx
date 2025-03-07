'use client'
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

  export default function Page() {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    };
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
       <h1 className="text-4xl font-bold text-gray-600">
       Test page
      </h1> 
      <button
        onClick={fetchData}
        className="px-4 py-2 bg-gray-600 text-white rounded"
      >
        Test Firebase
      </button>
      </div>
    );
  }