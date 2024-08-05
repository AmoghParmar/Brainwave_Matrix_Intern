// import React,{useState, useEffect} from 'react';
// import Web3Modal from "web3modal";
// import { ethers } from 'ethers';
// import {create as ipfsHttpClient} from "ipfs-http-client";
// import axios from "axios";
// import {useRouter} from "next/router";

// import { VotingAddress,VotingAddressABI } from './constants';
// import { connect } from 'http2';
// import voterList from '../pages/voterList';

// // const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
// const projectId = ""
// const projectSecretKey = ""
// const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`;

// // const subdomain = "https://daulat-nft-marketplace"

// const client = ipfsHttpClient({
//   host:"infura-ipfs.io",
//   port:5001,
//   protocol:"https",
//   headers:{
//     authorization: auth,
//   },
// })

// const fetchContract = (signerOrProvider)=> 
//   new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

// export const VotingContext = React.createContext();

// export const VotingProvider = ({children})=>{
//   const votingTitle = "My first smart contact app";
//   const router = useRouter();
//   const[currentAccount, setCurrentAccount]= useState("");
//   const[candidateLength, setCandidateLength]= useState("");
//   const pushCandidate = [];
//   const candidateIndex= [];
//   const [candidateArray, setCandidateArray]  = useState(pushCandidate);

//   // ppEnd of candidate data

//   const[error,setError]= useState("");
//   const highestVote = [];

//   // Voter SECTIONN
//   const pushVoter = [];
//   const [voterArray, setvoterArray]= useState(pushVoter);

//   const [voterLength, setvoterLength] = useState("");
//   const [voterAddress, setvoterAddress] = useState([]);
      
//   // Connecting metamsk

//   const checkIfWalletIsConnected = async ()=>{
//     if(!window.ethereum) return setError ("please Install MetaMask");

//     const account = await window.ethereum.request({method: "eth_accounts"});

//     if(account.length){
//       setCurrentAccount(account[0]);

//     }else{
//       setError("Please Install Metamask & Connect, Reload");

//     }


//   };

//   // Connect Wallet4
//   const connectWallet = async ()=>{
//     if(!window.ethereum) return setError ("please Install MetaMask");

//     const account = await window.ethereum.request({method: "eth_requestAccounts"});

//     setCurrentAccount(account[0]);
//   };


//   // Upload Image to IPFS
//   // const uploadToIPFS = async (file)=>{
//   //     if(file){
//   //       try {
//   //         const formData = new FormData();
//   //         formData.append("file" , file);
  
//   //         const response = await axios({
//   //           method= "post",
//   //           url = "https://api.pinata.cloud/pinning/pinFileToIPFS",
//   //           data: formData,
//   //           headers: {
//   //             pinata_api_key : `9d03a2580c7a2c190538`,
//   //             pinata_secret_api_key: `19df2cf3aff00256fc86448cee4cd5796e58acb0dc62ba86090c28aaad4efba5`,
//   //             "Content-Type"  : "multipart/form-data",
//   //           },
            
          
//   //         // return;
//   //       } catch (error) {
//   //         setError("Error Uploading file to IPFS");
//   //        }

//   //     }
//   // };

//     // Upload CANDIDATE Image to IPFS
//     const uploadToIPFSCandidate = async (file)=>{
//       try {
//         const added = await client.add({context: file});

//         const url = `${subdomain}/ipfs/${added.path}`;
//         return url;
//       } catch (error) {
//         setError("Error Uploading file to IPFS");
//        }
//   };

//   // ------CREATEEE VOTERR
//   const createVoter = async(formInput, fileUrl, router)=>{
//       try {
//         const {name, address, position} = formInput;
//         if(!name || !address || !position)return console.log("Input data is missingg");

//         console.log(name, address, age, fileUrl);

//         // CONNECTINGG SMARTT CONTRACTT
//         const web3Modal = new Web3Modal();
//         const connection = await web3Modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         const signer = provider.getSigner();
//         const contract = fetchContract(signer);
        
//         const data = JSON.stringify({name, address, position, image :fileUrl});
//         const added = await client.add(data);

//         const url = `${subdomain}/ipfs/${added.path}`;
        
//         // const candidate = await contract.setCandidate(address, name, url, fileUrl);
//         const voter = await contract.voterRight(address, name, url, fileUrl);
//         voter.wait();

//         console.log(voter);

//         // router.push("/voterList");
//       } catch (error) {
//         setError("Something wrong creating voterr")
//         4<9
//       }
//   };

//     // ==========-----GET VOTERR DATAAAA
    
//   const getAllVoterData = async()=>{
//       try{
//         const web3Modal = new Web3Modal();
//         const connection = await web3Modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         const  signer = provider.getSigner();
//         const contract = fetchContract(signer);


//         // VOTERR LISTT
//         const voterListData= await contract.getVoterList();
//         setvoterAddress(voterListData);
        
//         voterListData.map(async (el)=>{
//           const singleVoterData = await contract.getVoterdata(el);
//           pushVoter.push(singleVoterData);
//         });

//         // /VOTERRR LENGTHHH
//         const voterList = await contract.getVoterLength();
//         setvoterLength(voterList.toNumber());
//       }
//       // }
      
//       catch(error){
//         setError("Something went wrong fetching the data");
//       }

//   };
//     // useEffect(()=>{
//     //   getAllVoterData();

//     // }, []);

//     // GIVE VOTEE
//   const giveVote= async(id) => {
//       try {
//         const voterAddress = id.address;
//         const voterId = id.id;
//         const web3Modal = new Web3Modal();
//         const connection = await web3Modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         const  signer = provider.getSigner();
//         const contract = fetchContract(signer);

//         const voteredList = await contract.vote(voterAddress, voterId);
//         console.log(voteredList);
//       } catch (error) {
//         console.log(first)
//       }
//   };

  
//   // ----------------------CANDIDATE SECTION------------------
//   const setCandidate = async(candidateForm, fileUrl, router)=>{
//   try {
//     const {name, address, age} = candidateForm;
//     if(!name || !address || !age)return setError("Input data is missingg");

//     // CONNECTINGG SMARTT CONTRACTT
//     const web3Modal = new Web3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();
//     const contract = fetchContract(signer);
    
//     const data = JSON.stringify({name, address, image :fileUrl, age});
//     const added = await client.add(data);

//     const ipfs = `${subdomain}/ipfs/${added.path}`;
    
//     const voter = await contract.setCandidate(address, age, name, url, fileUrl, ipfs);
//     voter.wait();

//     console.log(voter);

//     router.push("/");
//   } catch (error) {
//     setError("Something wrong creating voterr")
    
//   }
//   };

//   // ---GET CANDIDATE DAATA
//   const getNewCandidate = async()=>{
//   try {
//         // CONNECTINGG SMARTT CONTRACTT
//     const web3Modal = new Web3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();
//     const contract = fetchContract(signer);

//     // ------ALL CANDIDATTEEE
//     const allCandidate = await contract.getCandidate();

//     allCandidate.map(async (el)=>{
//       const singleCandidateData = await contract.getCandidatedata(el);

//       pushCandidate.push(singleCandidateData);
//       candidateIndex.push(singleCandidateData[2].toNumber());
//     });
    
//     // ====CANDIDATE LENGTH
//     const allCandidateLength = await contract.getCandidateLength();
//     setCandidateLength(allCandidateLength.toNumber());

//   } catch (error) {
//     console.log(error)
//   }
//   };

//   useEffect(()=>{
//     getNewCandidate()
//   }, []);

//   return(
//     <VotingContext.Provider value={{votingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS, createVoter,getAllVoterData,giveVote,setCandidate,getNewCandidate,error, voterArray, voterLength,voterAddress,currentAccount, candidateLength, candidateArray, uploadToIPFSCandidate,}}>{children}</VotingContext.Provider>
//   );
// };

// // export default Voter



// ////////////////////////////////////
//////////////////////////////////////
//////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
import React, { useState, useEffect, createContext } from 'react';
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";
import { VotingAddress, VotingAddressABI } from './constants';

// IPFS Client Configuration
const projectId = "YOUR_PROJECT_ID";
const projectSecretKey = "YOUR_PROJECT_SECRET_KEY";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`;

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const votingTitle = "My first smart contract app";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const [candidateArray, setCandidateArray] = useState([]);
  const [error, setError] = useState("");
  const [voterArray, setVoterArray] = useState([]);
  const [voterLength, setVoterLength] = useState("");
  const [voterAddress, setVoterAddress] = useState([]);

  // Connecting Metamask
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      setError("Please connect to MetaMask and reload the page");
    }
  };

  // Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    setCurrentAccount(accounts[0]);
  };

  const uploadToIPFS = async (file)=>{
    if(file){
      try{
        const formData = new FormData();
        formData.append("file",file);

        const response = await axios({
          method : "post",
          url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formData,
          headers:{
            pinata_api_key : `9d03a2850c7a2c190538`,
            pinata_secret_api_key :`
            19df2cf3af00256fc86448cee4cd5796e58acb0dcd62ba86090c28aaad4efba5`,
            "Content-Type" : "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        return ImgHash;

      }catch(error){
        console.log("Unavle to upload image to Pinata");
      }
    }
  };

  // Upload Image to IPFS
  const uploadToIPFSCandidate = async (file) => {
    if(file){
      try{
        const formData = new FormData();
        formData.append("file",file);

        const response = await axios({
          method : "post",
          url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formData,
          headers:{
            pinata_api_key : `9d03a2850c7a2c190538`,
            pinata_secret_api_key :`
            19df2cf3af00256fc86448cee4cd5796e58acb0dcd62ba86090c28aaad4efba5`,
            "Content-Type" : "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        return ImgHash;

      }catch(error){
        console.log("Unavle to upload image to Pinata");
      }
    }
  };

  // Create Voter
  const createVoter = async (formInput, fileUrl, router) => {
    try {
      const { name, address, position } = formInput;
      if (!name || !address || !position) return console.log("Input data is missing");

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({ name, address, position, image: fileUrl });

      const response = await axios({
        method:"POST",
        url:"jttps://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key :`9d03a2850c7a2c190538`,
          pinata_secret_api_key:`
          19df2f3a400256fc86448cee4cd5796e58acb0dcd62ba86090c28aaad4efba5
          `,
          "Content-Type" : "application/json",
        },
      });
      const added = await client.add(data);

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      const voter = await contract.voterRight(address, name, url, fileUrl);
      await voter.wait();

      location.reload();

      router.push("/voterList");
    } catch (error) {
      setError("Something went wrong creating voter");
    }
  };

  // Get All Voter Data
  const getAllVoterData = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);

      const voters = await Promise.all(
        voterListData.map(async (el) => {
          const singleVoterData = await contract.getVoterData(el);
          return singleVoterData;
        })
      );

      setVoterArray(voters);

      const voterCount = await contract.getVoterLength();
      setVoterLength(voterCount.toNumber());
    } catch (error) {
      setError("Something went wrong fetching the data");
    }
  };

  // Give Vote
  const giveVote = async (id) => {
    try {
      const { address, voterId } = id;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const voteTx = await contract.vote(address, voterId);
      await voteTx.wait();

      voteredList.wait()
    } catch (error) {
      setError("Something went wrong while voting");
    }
  };

  // Set Candidate
  const setCandidate = async (candidateForm, fileUrl, router) => {
    try {
      const { name, address, age } = candidateForm;
      if (!name || !address || !age) return setError("Input data is missing");

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({ name, address, image: fileUrl, age });

      const response = await axios({
        method:"POST",
        url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key :`9d03a2850c7a2c190538`,
          pinata_secret_api_key:`
          19df2f3a400256fc86448cee4cd5796e58acb0dcd62ba86090c28aaad4efba5
          `,
          "Content-Type" : "application/json",
        },
      });
      // const added = await client.add(data);

      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      const candidate = await contract.setCandidate(address, age, name, url, fileUrl, url);
      await candidate.wait();

      router.push("/");
    } catch (error) {
      setError("Something went wrong creating candidate");
    }
  };

  // Get New Candidate Data
  const getNewCandidate = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const allCandidates = await contract.getCandidate();
      const candidates = await Promise.all(
        allCandidates.map(async (el) => {
          const singleCandidateData = await contract.getCandidateData(el);
          return singleCandidateData;
        })
      );

      setCandidateArray(candidates);

      const candidateCount = await contract.getCandidateLength();
      setCandidateLength(candidateCount.toNumber());
    } catch (error) {
      setError("Something went wrong fetching candidates");
    }
  };

  useEffect(() => {
    getNewCandidate();
    getAllVoterData();
  }, []);

  return (
    <VotingContext.Provider
      value={{
        votingTitle,
        checkIfWalletIsConnected,
        connectWallet,
        createVoter,
        getAllVoterData,
        giveVote,
        setCandidate,
        getNewCandidate,
        error,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        candidateLength,
        candidateArray,
        uploadToIPFSCandidate,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
