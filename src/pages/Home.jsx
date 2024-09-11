import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Input } from "antd";
import axios from "axios";
import React from "react";

function Home() {
  const { data: userData = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("http://localhost:3000/users"),
  });

  const { mutate: addUser } = useMutation({
    mutationFn: (body) => axios.post("http://localhost:3000/users", body),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/users/${id}`),
    onSuccess: () => refetch(),
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: (data) =>
      axios(`http://localhost:3000/users/${data.id}`, {
        name: data.newValue,
      }),
    onSuccess: () => refetch(),
  });

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: String(
        userData?.data?.length
          ? Number(userData?.data[userData?.data?.length - 1]?.id) + 1
          : "1"
      ),
      name: e.target.user.value,
      lastName: "Vohidov",
      age: 20,
    };
    console.log(userData?.data?.length);

    console.log(data);
    addUser(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-[450px] flex p-5">
        <Input placeholder="Add new user" size="large" name="user" />
        <Button
          htmlType="submit"
          type="primary"
          className="!bg-green-700"
          size="large"
        >
          Add
        </Button>
      </form>
      <div className="p-5">
        {userData.data?.map((item) => (
          <div key={item.id} className="w-[250px] p-5 rounded-lg bg-slate-300">
            <p>Name: {item.name}</p>
            <p>Last Name: {item.lastName}</p>
            <p>Age: {item.age}</p>
            <Button
              onClick={() => deleteUser(item.id)}
              size="large"
              className="!bg-red-600 !text-white"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                let newValue = prompt("Enter new value", item.name);
                const data = {
                  id: item.id,
                  newValue,
                };
                updateUser(data);
              }}
              className="!bg-green-500"
              size="large"
              classNames={"!bg-green-500"}
            >
              Update
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
