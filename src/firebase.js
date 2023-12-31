import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAhtkrP25ZGpiXUiFsSRbXXn5DkPG1Jc0",
  authDomain: "todo-8d74e.firebaseapp.com",
  projectId: "todo-8d74e",
  storageBucket: "todo-8d74e.appspot.com",
  messagingSenderId: "976231515833",
  appId: "1:976231515833:web:5c9140c1d955e9cc70fd68"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Login with email and password
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User logged in successfully:", user.uid);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User registered successfully:", user.uid);
    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
  }
};

export const onTasksSnapshot = (userId, setTasks) => {
  const userTasksRef = doc(collection(db, "users"), userId);
  const unsubscribe = onSnapshot(userTasksRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const tasksData = userData.tasks || [];
      setTasks(tasksData);
    } else {
      console.log(`No tasks found for user with ID: ${userId}`);
      setTasks([]);
    }
  });
  return unsubscribe;
};

// Replace the existing createTask function in your firebase.js file with this one

export const createTask = async (userId, task) => {
  try {
    const userTasksRef = doc(collection(db, "users"), userId);
    const docSnapshot = await getDoc(userTasksRef);
    const newTask = {
      id: uuidv4(),
      text: task,
      done: false,
      date_added: Timestamp.now(),
    };
    if (docSnapshot.exists()) {
      await updateDoc(userTasksRef, {
        tasks: [newTask, ...docSnapshot.data().tasks],
      });
    } else {
      await setDoc(userTasksRef, {
        tasks: [newTask],
        accountCreationDate: Timestamp.now(), // Add this line to set the account creation date
      });
    }
    console.log("Task created successfully!");
  } catch (error) {
    console.error("Error creating task:", error);
  }
};


export const updateTask = async (userId, taskId, updatedTask) => {
  try {
    const userTasksRef = doc(collection(db, "users"), userId);
    const docSnapshot = await getDoc(userTasksRef);

    if (docSnapshot.exists()) {
      const updatedTasks = docSnapshot.data().tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            ...updatedTask,
            date_done: updatedTask.is_done ? Timestamp.now() : null,
          };
        } else {
          return task;
        }
      });

      await updateDoc(userTasksRef, { tasks: updatedTasks });
      console.log("Task updated successfully!");
    } else {
      console.error("User document not found.");
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = async (userId, taskId) => {
  try {
    const userTasksRef = doc(collection(db, "users"), userId);
    const docSnapshot = await getDoc(userTasksRef);
    if (docSnapshot.exists()) {
      const updatedTasks = docSnapshot
        .data()
        .tasks.filter((task) => task.id !== taskId);
      await updateDoc(userTasksRef, { tasks: updatedTasks });
      console.log("Task deleted successfully!");
    } else {
      console.error("User document not found.");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
