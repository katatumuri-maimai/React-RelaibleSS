import React,{ Suspense,useEffect,useState }  from 'react';
import { withRouter } from 'react-router';　//withRouter
import '../../css/games/Game.css';
import '../../css/games/GameRoom.css';
import '../../css/games/GameResult.css';
import *as Comp from '../components/Texts';
import *as Btn from '../components/Btn';
import "firebase";
import firebase from "firebase/app";
import 'firebase/app';
import "../../firebase/config.js";
import {copyToClipboard} from '../components/original-function'
import html2canvas from "html2canvas";
import '../../py/trimming.py';

function GetDocID(){
  const Path = window.location.pathname
  const RoomID = Path.replace("/GameResult/","")
  const DocID = RoomID.split((/-/))[0]
  return DocID
}

async function GetData(){
const DocID = GetDocID()
  let gamelaps ="";
  let Member_List =[];
  let Title_List =[];
  let Gene_List =[];
  let Novel_List =[];

  let Novel_List_name=[];
  let Novel_List_text=[];

  if(DocID!=="" ){
    const Db =firebase.firestore().collection('CreateGameRoom').doc(DocID).collection('GameRoom')
    const Db_Setting =Db.doc(DocID).collection('GameRoomSettings')
    const Db_Novel =Db.doc(DocID).collection('Novel')

    firebase.firestore().collection('CreateGameRoom').doc(DocID).get().then((e)=>{
      gamelaps=e.data().gamelaps
    })

    await Db_Setting.doc("Member").get().then((snap)=>{
      Member_List=snap.data()
    })
    await Db_Setting.doc("Title").get().then((snap)=>{
      Title_List=snap.data()
    })
    await Db_Setting.doc("Gene").get().then((snap)=>{
      Gene_List=snap.data()
    })

    const member_count=Object.keys(Member_List).length
    const novel_size = member_count * gamelaps

    for(var i=1;i<=novel_size;i++){
      const n = String(i)
      await Db_Novel.doc(n).get().then((snap)=>{
        Novel_List.push(snap.data())
        Novel_List_name.push(snap.data().userName)
        Novel_List_text.push(snap.data().texts)
        // console.log(snap.data());
      })

    }


    // console.log(gamelaps);

// テキストをコピー用にテキストを生成

  const br ="\n"
  const line ="＊＊＊＊＊"
  const Title = "「" + Title_List["Title_1"] + "の" + Title_List["Title_2"] + "の" + Title_List["Title_3"] + "」" +br
  const Gene =Gene_List["Gene_1"] + "/" + Gene_List["Gene_2"] +br
  let Member ="";
  let Novel ="";
  let texts="";

  console.log(Member_List);

  for(var f=1 ;f<=member_count;f++){
    const key ="Member_"+ f
    Member =Member+"☆"+f+Member_List[key].userName+"  "+ br
  }

  Novel_List.map((e,i)=>{
    i++
    const name = "#"+i+ "#" +e.userName
    const texts = e.texts
    const note = line +br + name +br + texts+br+ br
    Novel=Novel + note

    return null
  })

  texts = Title+ br +Gene+ br+ line+br+"メンバー"+br + Member+ br+ br +Novel


  return {
    Member_List:Member_List,
    member_count:member_count,
    Title_List:Title_List,
    Gene_List:Gene_List,
    Novel_List:Novel_List,
    gamelaps:gamelaps,
    compNovel:texts,
    Novel_List_name:Novel_List_name,
    Novel_List_text:Novel_List_text,
  }
}
}

function Novel(){
  const [Title_List, setTitle_List] = useState(null);
  const [Gene_List, setGene_List] = useState(null);
  const [Ls, setLs] = useState(null);
  const [txt, settxt]= useState(null);

useEffect(() => {
  GetData().then((p) =>{
    setTitle_List(p.Title_List)
    setGene_List(p.Gene_List)
    setLs(p.Novel_List_name)
    settxt(p.Novel_List_text)
  });
}, []);

if (!Title_List||!Gene_List||!Ls|| !txt) {
  return <p></p>;
}

// async function sleep(){
//   const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//   await _sleep(3000);
// }



  return(
    <div id="target" className="screenShot_arget" >
      <div className="novel_title_wrap" >
        <div id="title" className="novel_title flex_row">
          <p id="Title_1">{Title_List["Title_1"]}</p>の
          <p id="Title_2">{Title_List["Title_2"]}</p>の
          <p id="Title_3">{Title_List["Title_3"]}</p>
          </div>
          </div>

          <div className="novel_Gene_wrap" >
            <div id="title" className="novel_Gene flex_row">
              <div id={Gene_List["Gene_1"]} className="Genre_Ch Btn_on"></div>
              <div id={Gene_List["Gene_2"]} className="Genre_Ch Btn_on"></div>
              </div>
              </div>


  <div className="novel_entry_wrap">
    {
    Ls.map((e,i=0)=>{
      const y =txt[i]
      i++
      return(
        <div key={i} className="novel_text">
          <div className="text">{y}</div>
          <div className="name">
            {e}
          </div>

        </div>
      )
    })
  }
  </div>
  <div className="novel_footer"></div>

</div>

)

}

function CompNovel(){
  const [compNovel, setCompNovel] = useState(null);

useEffect(() => {
  GetData().then(p => setCompNovel(p.compNovel));
}, []);

if (!compNovel) {
  return <p className="loading"></p>;
}

  return (
  <Comp.TextArea
    texts="皆で作った小説"
     InputTextFor="copyTarget"
     value={compNovel}
    />
)
}



async function screenShot(){
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await _sleep(1000);
    var imgData = ""

    async function A(height){
      await html2canvas(target,{
                  scale:2,
                  logging: false,
                  allowTaint: true,
                  useCORS: true,
                  width: 300,
                  height: height,
              }).then((canvas )=> {

        imgData = canvas.toDataURL("image/jpeg");

    });
      return(imgData)
    }




    let target =  document.getElementById("target")

    while(!target || !("clientHeight" in target) || ("clientHeight" in target)===false){
      await _sleep(2000);
      target =  document.getElementById("target")
    }

    if(target!==null && ("clientHeight" in target)){
        const height = target.clientHeight*10

        imgData=await A(height)
        if(!imgData===false){
        return(imgData)
      }
    }
//
//     let target =  document.getElementById("target")
//     if(target!==null && target.hasOwnProperty("clientHeight")){
//       const height = target.clientHeight*10
//       imgData=await A(height)
//     return(imgData)
//
//   }else{
//     await _sleep(3000);
//       target =  document.getElementById("target")
//     if(target!==null &&target.hasOwnProperty("clientHeight")){
//       target =  document.getElementById("target")
//       const height = target.clientHeight*10
//         imgData=await A(height)
//         return(imgData)
//
//     }else{
//       await _sleep(3000);
//       target =  document.getElementById("target")
//       const height = target.clientHeight*10
//         imgData=await A(height)
//         return(imgData)
//
//     }
//
// }
  }



async function trimImage(){

    const image = await screenShot()

    if(!image===false){
      const url = 'http://192.168.0.19:6060/image';
      const data = JSON.stringify({data: image})
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let trimedimage = "";

      await fetch(url, {
        method: 'POST',
        mode: 'cors',
        header:myHeaders,
        body:data,
      }).then((response) => {
          if(!response.ok) {
              console.log('error!');
          }
          console.log('ok!');
          return response.text()
      }).then((data)  => {
          trimedimage= data
      }).catch((error) => {
          console.log(error);
      });
      return(trimedimage)
  }}

  function ClickShot(){
    const [trimedimage, settrimedImage] = useState(null);

  useEffect(() => {
    trimImage().then(p => settrimedImage(p));
  }, []);

  if (!trimedimage) {
    return <p className="loading"></p>;
  }


  let savenovel_image =  document.getElementById("savenovel_image")
  if(savenovel_image!==null && ("style" in savenovel_image) && ("marginBottom" in savenovel_image.style)){
    savenovel_image.style.marginBottom = 200 + 'px'
  }

    return(
      <div >
      <p>画像を長押しや右クリックで保存♪<br/>↓↓↓</p>
        <img src={trimedimage} id="image_python" alt="小説の結果画像"/>
      </div>
    )
  }



class GameResult extends React.Component {
      constructor(props) {
        super(props);
        this.state={
          compImage:"",
          python_image:"",
      };

    }
  // 保存用の要素までスクロールする

  scrolltoTexts(){
    var element = document.getElementById("savenovel_text");
    var bottom = element.getBoundingClientRect().top -50;
    window.scrollTo({left:0,top:bottom,behavior: "smooth"});
  }

  scrolltoimage(){
    var element = document.getElementById("savenovel_image");
    var bottom = element.getBoundingClientRect().top -50;
    window.scrollTo({left:0,top:bottom,behavior: "smooth"});
  }




  render(){

      return (
        <div className="GameResult">
          <h1>小説完成！</h1>
          <Comp.MainColorMidashiH2
            texts="小説を保存しよう♪"
            />
          <div className="flex_row">
            <Btn.AccentColorBtn
              texts="テキストで保存"
              onClick={()=>{this.scrolltoTexts()}}
              />

              <Btn.AccentColorBtn
                texts="画像で保存"
                onClick={()=>{this.scrolltoimage()}}
                />
          </div>
          <Comp.InfomationArea
            texts="小説はこの画面で保存してね♪<br>画面を閉じてしまうと<br>小説が消えてしまいますm(__)m"
            />


          <Btn.MainColorBtn
              texts="最初から始める"
              link="/NewGame"
              />


            <div id="savenovel">
              <div id="savenovel_text">
                <Comp.AccentColorMidashiH2
                  texts="テキストで保存"
                  />
                  <Comp.InfomationArea
                    texts="テキストをコピーして<br>メモ帳などに保存してね♪"
                    />

                  <Suspense fallback={<p className="loading"></p>}>

                  <CompNovel/>

                </Suspense>


                    <Btn.MainColorBtn
                        texts="テキストをコピー"
                        onClick={()=>{copyToClipboard()}}
                        />


              </div>



              <div id="savenovel_image">
                <Comp.AccentColorMidashiH2
                  texts="画像で保存"
                  />

                <ClickShot/>


                  <Novel/>


              </div>

            </div>


        </div>
      );
    }



}

export default withRouter(GameResult);　//withRouter
