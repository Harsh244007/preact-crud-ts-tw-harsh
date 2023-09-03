// import { memo, useEffect, useState, useMemo } from "preact/compat";


// const UserForm = ({
//   user,
//   onSave,
//   onCancel,
// }: {
//   user: User | null;
//   onSave: (user: User) => void;
//   onCancel: () => void;
// }) => {
//   const [editedUser, setEditedUser] = useState<User | null>(user);

//   const handleInputChange = (
//     field: keyof User,
//     value: string | number
//   ) => {
//     if (editedUser) {
//       const updatedUser = { ...editedUser, [field]: value };
//       setEditedUser(updatedUser);
//     }
//   };

//   const handleSave = () => {
//     if (editedUser) {
//       onSave(editedUser);
//       setEditedUser(null);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Name"
//         value={editedUser?.name || ""}
//         onChange={(e) => handleInputChange("name", e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={editedUser?.phoneNumber || ""}
//         onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={editedUser?.age || 0}
//         onChange={(e) => handleInputChange("age", parseInt(e.target.value, 10))}
//       />
//       <input
//         type="text"
//         placeholder="Gender"
//         value={editedUser?.gender || ""}
//         onChange={(e) => handleInputChange("gender", e.target.value)}
//       />
//       <button onClick={handleSave}>Save</button>
//       <button onClick={onCancel}>Cancel</button>
//     </div>
//   );
// };

// const JsonServer = () => {
//   type User = {
//     id: number;
//     name: string;
//     phoneNumber: string;
//     age: number;
//     gender: string;
//   };

//   const [users, setUsers] = useState<User[]>([]);
//   const [newUser, setNewUser] = useState<User | null>(null);
//   const [editingUserId, setEditingUserId] = useState<number | null>(null);
//   const [isAddingUser, setIsAddingUser] = useState(false);

//   const [editingUser, setEditingUser] = useState<User | null>(null);

//   useEffect(() => {
//     fetch("http://localhost:3001/users")
//       .then((response) => response.json())
//       .then((data) => {
//         setUsers(data);
//       });
//   }, []);

//   const userComponents = useMemo(() => {
//     return users.map((user) => (
//       <li key={user.id} className="flex w-full justify-between items-center space-x-2">
//         {editingUserId === user.id ? (
//           <>
//             <input
//               type="text"
//               value={newUser?.name || ""}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               className="border border-gray-400 p-2 rounded-md"
//             />
//             <input
//               type="text"
//               value={newUser?.phoneNumber || ""}
//               onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//               className="border border-gray-400 p-2 rounded-md"
//             />
//             <input
//               type="number"
//               value={newUser?.age || 0}
//               onChange={(e) => handleInputChange("age", parseInt(e.target.value, 10))}
//               className="border border-gray-400 p-2 rounded-md"
//             />
//             <input
//               type="text"
//               value={newUser?.gender || ""}
//               onChange={(e) => handleInputChange("gender", e.target.value)}
//               className="border border-gray-400 p-2 rounded-md"
//             />
//             <button
//               onClick={() => handleEditUser(user.id)}
//               className="bg-green-500 text-white px-3 py-2 rounded-md"
//             >
//               Save
//             </button>
//           </>
//         ) : (
//           <>
//             <span>{user.name}</span>
//             <span>{user.phoneNumber}</span>
//             <span>{user.age}</span>
//             <span>{user.gender}</span>
//             <button
//               onClick={() => handleEditUser(user.id)}
//               className="text-blue-500 hover:text-blue-700"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDeleteUser(user.id)}
//               className="text-red-500 hover:text-red-700"
//             >
//               Delete
//             </button>
//           </>
//         )}
//       </li>
//     ));
//   }, [users, editingUserId, newUser]);

//   const handleInputChange = (field: keyof User, value: any) => {
//     if (newUser) {
//       const updatedUser = { ...newUser, [field]: value };
//       setNewUser(updatedUser);
//     }
//   };

//   const handleAddUser = () => {
    
//     setIsAddingUser(true);
//     setEditingUser(null);
//     if (newUser) {
//       fetch("http://localhost:3001/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setUsers([...users, data]);
//           setNewUser(null);
//         });
//     }
//   };

  
//   const handleCancelUser = () => {
//     setIsAddingUser(false);
//     setEditingUser(null);
//   }

//   const handleEditUser = (userId: number) => {
//     if (newUser) {
//       // Update an existing user by ID
//       // handleEditUser(userId, user);
//       fetch(`http://localhost:3001/users/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const updatedUsers = users.map((user) =>
//             user.id === userId ? data : user
//           );
//           setUsers(updatedUsers);
//           setEditingUserId(null);
//           setNewUser(null);
//         });
//     }
//   };
//   const handleSaveUser = (user: User) => {
//     if (user.id) {
//       // Edit user
//       handleEditUser(user.id, user);
//     } else {
//       // Add new user
//       handleAddUser(user);
//     }
//   };

//   const handleDeleteUser = (userId: number) => {
//     fetch(`http://localhost:3001/users/${userId}`, {
//       method: "DELETE",
//     }).then((response) => {
//       if (response.status === 200) {
//         // User deleted successfully
//         const updatedUsers = users.filter((user) => user.id !== userId);
//         setUsers(updatedUsers);
//       } else {
//         console.error("Error deleting user");
//       }
//     });
//   };

//   const handleAddNewUser = () => {
//     setNewUser({
//       id: Date.now(),
//       name: "",
//       phoneNumber: "",
//       age: 0,
//       gender: "",
//     });
//   };

//   return (
//     <div className="my-8 mx-auto max-w-md p-4 border border-blue-500 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">User List</h2>
//       <div className="mb-4">
//       {isAddingUser ? (
//           <UserForm
//             user={editingUser}
//             onSave={(user) => {
//               handleSaveUser(user);
//               setIsAddingUser(false);
//             }}
//             onCancel={handleCancelUser}
//           />
//         ) : (
//           <button
//             onClick={handleAddNewUser}
//             className="bg-blue-500 text-white px-3 py-2 rounded-md"
//           >
//             Add New User
//           </button>
//         )}
//       </div>
//       <ul className="list-disc flex flex-col gap-4">{userComponents}</ul>
//     </div>
//   );
// };

// export default memo(JsonServer);
