import React,{useState,useEffect,useMemo} from 'react';
import "firebase";
import firebase from "firebase/app";
import 'firebase/app';
import "../../firebase/config.js";
import {arrayShuffle} from './original-function';


function getRoomID(){
  const userId = window.location.search.replace("?userId=","")
  const Path = window.location.pathname
  const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
  const DocID = RoomID.split((/-/))[0]
  return {
    DocID:DocID,
    RoomID:RoomID,
    userId:userId
    }
}

export async function SetSuffuledData(){
  const Data =await GetData()
  const IDs = getRoomID()
  const DocID =IDs.DocID

  if(!Data){}

  const tite = Data.title
  const gene = Data.gene
  const member = Data.member
  const tite_List = []
  const gene_List = []



  tite.forEach((e)=>{
    for(var key in e){
      if(tite_List.includes(e[key])===false){
        tite_List.push(e[key])
      }
    }
  })

  gene.forEach((e)=>{
    for(var key in e){
      if(gene_List.includes(e[key])===false){
        gene_List.push(e[key])
      }
  }})

  const suffuled_title = arrayShuffle(tite_List)
  const suffuled_gene = arrayShuffle(gene_List)
  const suffuled_member =arrayShuffle(member)

  let suffuled_title_list ={}
  let suffuled_gene_list = {}
  let suffuled_member_list={}

  suffuled_title_list["Title_1"]=suffuled_title[0]
  suffuled_title_list["Title_2"]=suffuled_title[1]
  suffuled_title_list["Title_3"]=suffuled_title[2]

  suffuled_gene_list["Gene_1"]=suffuled_gene[0]
  suffuled_gene_list["Gene_2"]=suffuled_gene[1]

  suffuled_member.forEach((e,i)=>{
    const tag = "Member_" + (i+1)
    suffuled_member_list[tag]=e
  })

  if(DocID!==""){
    const Db
     = firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('GameRoomSettings')
     const Db_title = Db.doc("Title")
     const Db_gene = Db.doc("Gene")
     const Db_member = Db.doc("Member")

     Db_title.set(suffuled_title_list).catch((error)=>{
       console.log("error");
     })
     Db_gene.set(suffuled_gene_list).catch((error)=>{
       console.log("error");
     })
     Db_member.set(suffuled_member_list).catch((error)=>{
       console.log("error");
     })

     return Data
  }
}




async function GetData() {
  const IDs = getRoomID()
  const DocID =IDs.DocID
  // const RoomID =IDs.RoomID
  // const userId =IDs.userId
  let member_count;
  let member=[];
  let title=[];
  let gene=[];
  if(DocID!==""){

  await firebase.firestore().collection('CreateGameRoom').doc(DocID).get().then((e)=>{
    member_count =e.data().people
  })

  const Db =
   firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID)

  await Db.collection('Member').get().then((e)=>{
    e.docs.forEach((doc)=>{
       member.push(doc.data())
    })
   })

 await Db.collection('Title').get().then((e)=>{
   e.docs.forEach((doc)=>{
      title.push(doc.data())
   })
  })

 await Db.collection('Gene').get().then((e)=>{
   e.docs.forEach((doc)=>{
      gene.push(doc.data())
   })
  })


if(member.length === member_count && title.length === member_count && gene.length === member_count ){
  return(
        {
          member_count:member_count,
          title: title,
          gene: gene,
          member: member,
        }
    )
}
}
}
//
// async function Test333(){
//     const Data =await GetData()
//     const url = 'http://192.168.0.19:6060/suffule';
//     const data_json = JSON.stringify(Data)
//     const myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json',"charset=UTF-8");
//     let SentData = "";
//
//     await fetch(url, {
//       method: 'POST',
//       mode: 'cors',
//       header:myHeaders,
//       body:data_json,
//     }).then((response) => {
//         if(!response.ok) {
//             console.log('error!');
//         }
//         console.log('ok!');
//         return response.text()
//     }).then((data)  => {
//         SentData= data
//     }).catch((error) => {
//         console.log(error);
//     });
//
//     return(SentData)
//   }


//
//
//
//
//


class SetGameDataShuffle extends React.Component {
//
// async shufflename(){
//   const Path = window.location.pathname
//   const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
//   const DocID = RoomID.split((/-/))[0]
//   const MemberIDNameList = []
//   if(DocID!==""){
//   const Db =
//    firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Member')
//    await Db.get().then((querySnapshot)=>{
//     querySnapshot.forEach((doc) => {
//       const id=doc.id
//       const name=doc.data().userName
//       const idName = {
//         userId:id,
//         userName:name
//       }
//       MemberIDNameList.push(idName)
//   });
//    })
//   const shuffledIDName_list=arrayShuffle(MemberIDNameList)
//   return(shuffledIDName_list)
// }
// }
//
// async setName(){
//   const shuffledName_list =await this.shufflename()
//   const Path = window.location.pathname
//   const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
//   const DocID = RoomID.split((/-/))[0]
//   let Name_list ={};
//
//
//   const Db
//    =await firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('GameRoomSettings').doc("Member")
//    Db.get().then((snap)=>{
//      if(snap.data()===undefined){
//        shuffledName_list.map((e,i=0)=>{
//          const id = e.userId
//          const name = e.userName
//          const idtag = "Member_" +(i+1)
//          const nametag = "Member_Name_" +(i+1)
//          Name_list[idtag]=id
//          Name_list[nametag]=name
//          i=i+1
//
//          return Name_list
//        })
//          Db.set(Name_list,{marge:true})
//          console.log(">>>"+Name_list);
//    }
//    })
// }
//
//
//
//
//
// async getAllTitle(){
//   const Path = window.location.pathname
//   const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
//   const DocID = RoomID.split((/-/))[0]
//   const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Title')
//   const Title_List = [];
//   await Db.get().then((querySnapshot)=>{
//     querySnapshot.forEach((doc) => {
//       const Title_1=doc.data().Title_input_1
//       const Title_2=doc.data().Title_input_2
//       const Title_3=doc.data().Title_input_3
//       if(Title_1!==""){
//         if(Title_List.includes(Title_1)===false){
//         Title_List.push(Title_1)
//         }
//       }
//       if(Title_2!==""){
//         if(Title_List.includes(Title_2)===false){
//         Title_List.push(Title_2)
//         }
//       }
//       if(Title_3!==""){
//         if(Title_List.includes(Title_3)===false){
//         Title_List.push(Title_3)
//         }
//       }
//   });
//    })
//    // console.log(Title_List);
//    return(Title_List)
// }
//
// async shuffleTitle(){
//   const Tite_List =await this.getAllTitle()
//   const shuffledTitle_list=arrayShuffle(Tite_List)
//   return(shuffledTitle_list)
// }
//
// async setTitle(){
//   const shuffledTitle_list =await this.shuffleTitle()
//   const Path = window.location.pathname
//   const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
//   const DocID = RoomID.split((/-/))[0]
//
//   let TitleList = {};
//
//   if(shuffledTitle_list.length>=3){
//     TitleList={
//       Title_1:shuffledTitle_list[0],
//       Title_2:shuffledTitle_list[1],
//       Title_3:shuffledTitle_list[2]
//     }
//
//   const Db
//    =await firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('GameRoomSettings').doc("Title")
//    Db.get().then((snap)=>{
//      if(snap.data()===undefined){
//          Db.set(TitleList)
//          // console.log(TitleList);
//          // console.log(snap.data());
//    }
//    })
// }
//
// }
//
//
// async getAllGene(){
//   const Path = window.location.pathname
//   const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
//   const DocID = RoomID.split((/-/))[0]
//   const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('Gene')
//   const Gene_List = [];
//
//   await Db.get().then((querySnapshot)=>{
//     querySnapshot.forEach((doc) => {
//       const Gene_1=doc.data().Genre_id_1
//       const Gene_2=doc.data().Genre_id_2
//       const Gene_3=doc.data().Genre_id_3
//       if(Gene_1!==undefined){
//         if(Gene_List.includes(Gene_1)===false){
//         Gene_List.push(Gene_1)
//         }
//       }
//       if(Gene_2!==undefined){
//         if(Gene_List.includes(Gene_2)===false){
//         Gene_List.push(Gene_2)
//         }
//       }
//       if(Gene_3!==undefined){
//         if(Gene_List.includes(Gene_3===false)){
//         Gene_List.push(Gene_3)
//         }
//       }
//   });
//    })
//    return(Gene_List)
// }
//
//
// async shuffleGene(){
//   const Gene_List =await this.getAllGene()
//   const shuffledGene_list=arrayShuffle(Gene_List)
//   return(shuffledGene_list)
// }
//
// async setGene(){
//   const shuffledGene_list =await this.shuffleGene()
//   const Path = window.location.pathname
//   const RoomID = Path.replace(/\/GameRoom\/[a-z]+/i,"").replace("/","")
//   const DocID = RoomID.split((/-/))[0]
//
//   let GeneList = {};
//
//   if(shuffledGene_list.length>=2){
//     GeneList={
//       Gene_1:shuffledGene_list[0],
//       Gene_2:shuffledGene_list[1]
//     }
//
//   const Db
//    =await firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom').doc(DocID).collection('GameRoomSettings').doc("Gene")
//    Db.get().then((snap)=>{
//      if(snap.data()===undefined){
//          Db.set(GeneList)
//          // console.log(GeneList);
//          // console.log(snap.data());
//    }
//    })
// }
//
// }

  render(){
    if (!this.props.warn) {
    return null;
  }
    return(
      <div >
        <SetSuffuledData/>
      </div>
    )
  }
}
export default SetGameDataShuffle;
