import { useEffect, useState } from "react";
import { AddSkill } from "../../../redux/action/AddSkill";
import { DeleteSkill } from "../../../redux/action/DeleteSkill";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Swal from "sweetalert2";


const Skill = ({skill}) => {
  const { loading, data, error} = useSelector(
    (state) => state.skill
  );
  const router = useRouter()
  const dispatch = useDispatch();
  const [addData, setAddData] = useState({
    user_id: 12,
    skill: ''
  });
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(AddSkill(addData));
    // tambah kondisi loading, data, error
  }
  const handleDelete = (skill) => {
    dispatch(DeleteSkill({skill: skill}));
    console.log(skill, "testes")
    // tambah kondisi loading, data, error
  }
  useEffect(()=> {
    console.log(data, "xixi")
    if (data) {
      Swal.fire({
        icon: "success",
        text: "Data Successfully Added",
      });
        router.replace("/profile/edit");
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Please Try Again",
      });
    }
  },[data, error])

  
  return (
    <>
      <div className="bg-white mt-10 rounded-lg shadow-xl">
        <div className="border-b-2">
          <h1 className="font-bold text-2xl py-4 ml-10">Skill</h1>
        </div>
        <div className="flex flex-col mx-10 m-3 text-[#9EA0A5] mt-10">
          <form onSubmit={(e) => handleAdd(e)}>
          <div className="md:flex justify-between items-center">
            <input
              type="text"
              className="py-2 px-2 w-full my-2.5 bg-white border-2 md:mr-10 rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-[#5E50A1] focus:ring-1 focus:ring-[#5E50A1]"
              placeholder="Java"
              onChange={(e)=> {
                setAddData((prevData)=>({
                    ...prevData,
                    skill: e.target.value
                }))
              }}
            />
            <div className="">
              <button className="bg-[#FBB017] text-white px-5 py-2 rounded-md font-bold"> Simpan</button>
            </div>
          </div>
          </form>
          <div className="flex flex-row mt-4">
          {skill.map((item)=> {
              return (
                <>
                  <div className="flex bg-[#FBB017]/60 border-[#FBB017] border-2 p-2 w-32 justify-between rounded-md mr-5">
                    <p className="text-white font-bold">{item.skill}</p>
                      <div className="flex flex-row justify-end">
                        <button onClick={()=> handleDelete(item.skill)} value={item.skill}>
                          <img className="w-3" src="/img/delete.svg" />
                        </button>
                      </div>
                  </div>
                </>
              )
          })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;