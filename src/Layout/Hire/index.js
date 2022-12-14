import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Layout from "../../Component/Layout"



const HirePage = ({employees, skill, user, socket}) => {
  const {data} = useSelector(state => state.auth)
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const {id} = router.query
  const handleNotif = (e) => {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_URL_BE}api/v1/chat/conversations`,
      method: 'POST',
      data: {
        sender_id: data.userId,
        receiver_id: id 
      }
    }).then((res) => {

      socket.emit("sendMessage", {
        user,
        receiverId: id,
        message,
        header
      })

      Swal.fire({
        icon: "success",
        text: "Send Message Success",
      });
    }).catch((err) => {
      Swal.fire({
        icon: "success",
        text: "Send Message Error",
      });
    })
    

    
  }
  return(
    <>

    <div>
    <div className="bg-slate-100 pb-16">
      <div className="bg-[#5E50A1] h-80 md:w-full mx-auto rounded-xl w-11/12"></div>
        <div className="my-5 flex-row md:flex md:w-4/6 w-11/12 mx-auto -mt-64">
          <div className="bg-white md:w-4/6 p-6 w-full mr-10 justify-around md:rounded-xl">
            <div>
              <img className="mx-auto" src={`${process.env.REACT_APP_URL_BE}static/${employees[0].image}`} alt={employees[0].name}/>
            </div>
              <h1 className="mt-5 text-lg font-semibold">{employees[0].name}</h1>
            <div className="text-sm my-4">
              <p>{employees[0].job}</p>
              <p className="text-slate-600 mt-2">{employees[0].job_status}</p>
            </div>
            <div className="text-sm text-slate-600 mt-3 leading-6">
              <p>{employees[0].domicile}</p>
              <p>{employees[0].phone_number}</p>
            </div>
            <div className="text-sm text-slate-600 mt-2">
              <p>
                {employees[0].description}
              </p>
            </div>
            <button className="bg-[#5E50A1] hover:opacity-90 transition p-2 my-6 rounded-md w-full text-white font-semibold">Hire</button>
            <div>
              <div className="text-lg font-semibold">
                <p>Skill</p>
              </div>
              <div className="flex flex-wrap">
                {skill.map((item)=> {
                  return(
                    <p className="text-xs py-2 px-5 mr-4 mt-3 rounded-xl text-white font-semibold bg-[#FBB017]/60 border-2 border-yellow-700" key={item.skill_id}>{item.skill}</p>
                  )
                })}
              </div>
            </div>
          </div>
        <div className="flex flex-col bg-white rounded-xl p-5 w-full h-[80vh] md:mt-0 mt-10">
          <div className="p-1">
            <h1 className="text-2xl font-semibold mb-4">Hubungi {employees[0].name}</h1>
            <p className="text-sm font-normal mb-8 text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
            <div className="flex flex-col text-sm">
              <form action="#">
                <label className="text-slate-600" for="category">Tujuan tentang pesan ini : </label>
                <br/>
                <select name="category" for="category" 
                className="flex flex-col mb-3 w-full p-2 mt-3 bg-white border-[1px] rounded-md focus:border-[#5E50A1]"
                onChange={(e) => setHeader(e.target.value)} >
                  <option >Project</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                </select>
                <label className="text-slate-600" for="comment">Pesan : </label>
                <textarea className="w-full border-[1px] rounded-md h-4/6 border-[#5E50A1] p-2 mt-3"
                 name="comment" placeholder="tinggalkan pesan disini"
                 onChange={(e) => setMessage(e.target.value)}
                 ></textarea>
                <br/>
                <input className=" bg-[#5E50A1] px-2 py-2 w-full mx-auto mt-4 rounded-lg hover:cursor-pointer text-white"
                 type="submit" value="Kirim"
                 onClick={handleNotif}
                  />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default HirePage