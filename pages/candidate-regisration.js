// import React,{useState, useEffect, useCallback, useContext} from 'react';
// import {useRouter} from "next/router";

// // For uploading the data{image}
// import {useDropzone} from "react-dropzone";
// import image from "next/image";

// // Internal importss
// import {VotingContext} from "../context/Voter";
// import style from "../styles/allowdVoter.module.css";
// import image from "../assets";
// import Button  from "../components/Button/Button";
// import Input from '../components/Input/Input';
// const candidateRegistration = () => {
//   const [fileUrl, setFileUrl] = useState(null);
//   const [candidateForm, setCandidateForm]= useState({
//     name:"",
//     address:"",
//     age: "",
//   });

//   const router = useRouter();
//   const {setCandidate, uploadToIPFSCandidate, candidateArray, getNewCandidate} = useContext(VotingContext);

//   // -----------VOter IMAGE DROP
//   const onDrop = useCallback(async (acceptedFil) =>{
//     const url = await uploadToIPFSCandidate(acceptedFil[0]);
//     setFileUrl(url);
//   });


//   const {getRootProps, getInputProps} = useDropZone({
//     onDrop,
//     accept: "image/*",
//     maxSize: 5000000,
//   });

//   useEffect(()=>{
//     getNewCandidate();
//   }, []);
//   // console.log(fileUrl);

//   // ----JSX PART
//   return(
//     <div className={Style.createVoter}>
//       <div>
//         {fileUrl && (
//           <div className={Style.voterInfo}>
//             <img src={fileUrl} alt="Voter Image" />
//             <div className={Style.voterInfo_paragraph}>
//               <p>
//                 Name: <span>&nbps: {candidateForm.name}</span>
//               </p>
//               <p>
//                 Add: &nbps; <span>{candidateForm.addres.slice(0,20)}</span>
//               </p>
//               <p>
//                 age : &nbps: <span>{candidateForm.age}</span>
//               </p> 
//             </div>
//           </div>
//         )}
//         {
//           !fileUrl && (
//             <div className={Style.sideInfo}>
//               <div className={Style.sideInfo_box}>
//                 <h4>Create candidate For Voting</h4>
//                 <p>
//                   Blockcahin voting organization, provide ethereum blockcahin eco system
//                 </p>
//                 <p className={Style.sideInfo_para}>Contract Candidate</p>
//               </div>
//               <div className={Style.card}>
//                 {candidateArray.map((el, i)=>(
//                   <div key={i+1} className={Style.card_box}>
//                     <div className={Style.image}>
//                       <img src={el[3]} alt="Profile photo" />
//                     </div>
//                     <div className={Style.card_info}>
//                       <p>el[1] #{el[2].toNumber()}</p>
//                       <p>{el[0]}</p>
//                       <p>Address: {el[6].slice(0, 10)}..</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//       </div>
//       <div className={Style.voter}>
//         <div className={Style.voter__container}>
//           <h1>Create New Candidate</h1>
//           <div className={Style.voter__container__box}>
//             <div className={Style.voter__container__box__div}>
//               <div {...getRootProps()}>
//                 <input {...getInputProps()} />

//                 <div className={Style.voter__container__box__div__info}>
//                   <p>Upload File : JPG, PNG, GIF, WEBM Max 10MB</p>
//                   <div className={Style.voter__container__box__div__image}>
//                     <Image src={images.upload} width={150} height={150} objectFit = "contain" alt="File upload" />
//                   </div>
//                   <p>Drag & Drop File</p>
//                   <p>or Browse Media on you device</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={Style.input__container}>
//           <Input inputType="text" title="Address" placeholder="Voter Name" handleClick={(e)=>
//             setCandidateForm({...candidateForm, name: e.target.value})
//           }/>
//           <Input inputType="text" title="Address" placeholder="Voter Address" handleClick={(e)=>
//             setCandidateForm({...candidateForm, address: e.target.value})
//           }/> 
//           <Input inputType="text" title="Position" placeholder="Voter Position" handleClick={(e)=>
//             setCandidateForm({...candidateForm, age: e.target.value})
//           }/>
//           <div className={Style.button}>
//             <Button btnName= "Authorized Candidate" handleClick={()=>setCandidate(candidateForm, fileUrl, router)}/>
//           </div>
//         </div>
//       </div>
//       {/* ///////////////////// */}
//       <div className={Style.createdVoter}>
//         <div className={Style.createdVoter__info}>
//           <Image src={images.creator} alt="userProfile"/>
//           <p>Notice For User.</p>
//           <p>
//             Organizer <span>0x9399939...</span>
//           </p>
//           <p>Only organizer of the voting contract can create voter voting election</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default candidateRegistration;




// ------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ----------------------------------------------------------------
// -------------------------------------------------------------------

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image"; // Correct import for Image from Next.js
import { VotingContext } from "../context/Voter";
import styles from "../styles/allowedVoter.module.css"; // Fixed style import
import images from "../assets"; // Ensure this path is correct
import Button from "../components/Button/Button";
import Input from '../components/Input/Input';

const CandidateRegistration = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  });

  const router = useRouter();
  const { setCandidate, uploadToIPFSCandidate, candidateArray, getNewCandidate } = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFiles) => {
    const url = await uploadToIPFSCandidate(acceptedFiles[0]);
    setFileUrl(url);
  }, [uploadToIPFSCandidate]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    getNewCandidate();
  }, [getNewCandidate]);

  return (
    <div className={styles.createVoter}>
      <div>
        {fileUrl && (
          <div className={styles.voterInfo}>
            <img src={fileUrl} alt="Voter Image" />
            <div className={styles.voterInfo_paragraph}>
              <p>
                Name: <span>{candidateForm.name}</span>
              </p>
              <p>
                Address: <span>{candidateForm.address.slice(0, 20)}</span>
              </p>
              <p>
                Age: <span>{candidateForm.age}</span>
              </p>
            </div>
          </div>
        )}
        {!fileUrl && (
          <div className={styles.sideInfo}>
            <div className={styles.sideInfo_box}>
              <h4>Create Candidate For Voting</h4>
              <p>
                Blockchain voting organization, providing Ethereum blockchain ecosystem
              </p>
              <p className={styles.sideInfo_para}>Contract Candidate</p>
            </div>
            <div className={styles.card}>
              {candidateArray.map((el, i) => (
                <div key={i} className={styles.card_box}>
                  <div className={styles.image}>
                    <img src={el[3]} alt="Profile photo" />
                  </div>
                  <div className={styles.card_info}>
                    <p>{el[1]} #{el[2].toNumber()}</p>
                    <p>{el[0]}</p>
                    <p>Address: {el[6].slice(0, 10)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.voter}>
        <div className={styles.voter__container}>
          <h1>Create New Candidate</h1>
          <div className={styles.voter__container__box}>
            <div className={styles.voter__container__box__div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={styles.voter__container__box__div__info}>
                  <p>Upload File: JPG, PNG, GIF, WEBM Max 10MB</p>
                  <div className={styles.voter__container__box__div__image}>
                    <Image src={images.upload} width={150} height={150} objectFit="contain" alt="File upload" />
                  </div>
                  <p>Drag & Drop File</p>
                  <p>or Browse Media on your device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.input__container}>
          <Input inputType="text" title="Name" placeholder="Candidate Name" handleClick={(e) =>
            setCandidateForm({ ...candidateForm, name: e.target.value })
          } />
          <Input inputType="text" title="Address" placeholder="Candidate Address" handleClick={(e) =>
            setCandidateForm({ ...candidateForm, address: e.target.value })
          } />
          <Input inputType="text" title="Age" placeholder="Candidate Age" handleClick={(e) =>
            setCandidateForm({ ...candidateForm, age: e.target.value })
          } />
          <div className={styles.button}>
            <Button btnName="Authorize Candidate" handleClick={() => setCandidate(candidateForm, fileUrl, router)} />
          </div>
        </div>
      </div>
      <div className={styles.createdVoter}>
        <div className={styles.createdVoter__info}>
          <Image src={images.creator} alt="userProfile" />
          <p>Notice For User.</p>
          <p>
            Organizer <span>0x9399939...</span>
          </p>
          <p>Only the organizer of the voting contract can create voter voting election</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistration;
