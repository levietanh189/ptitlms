<template>
  <Menu></Menu>
  <div class="main-panel">
    <Header></Header>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="header">
                <h4 class="title">Quizz</h4>

              </div>
              <div class="content table-responsive">

                <div id="wrapper">

                  <div id="form-box">
                    <form>
                      <select id="language">
                        <option  value="HTML" selected="selected">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JS">Javascript</option>
                        <option value="PY">Python</option>
                        <option value="C">C language</option>
                      </select>
                      <a href="#qui" class="choose-lang">Test Skills</a>
                    </form>
                  </div>
                </div>
                <div class="quiz" id="#qui">
                  <div id="info">
                    <div id="score">Score: 0</div>
                    <div id="ques-left">Question:1/20</div>
                  </div>
                  <div id="ques-view">
                  </div>
                  <div class="question">
                    <h3>Question</h3>
                  </div>
                  <div class="choice">
                    <div class="options"><input type="radio" name="options" value="option1" id="opt0">&nbsp;<label for="opt0" id="lb0"> Option1</label></div>
                    <div class="options"><input type="radio" name="options" value="option2" id="opt1">&nbsp;<label for="opt1" id="lb1"> Option2</label></div>
                    <div class="options"><input type="radio" name="options" value="option3" checked="checked" id="opt2">&nbsp;<label for="opt2" id="lb2"> Option3</label></div>
                    <div class="options"><input type="radio" name="options" value="option4" id="opt3">&nbsp;<label for="opt3" id="lb3"> Option4</label></div>
                  </div>

                  <div class="ans-btn">
                    <button type="button" class="submit-answer">Submit Answer</button>
                    <a href="#display-final-score" type="button" class="view-results">View Results</a>
                  </div>

                </div>

                <div class="final-result">
                  <h1>The Quiz is Over</h1>
                  <div class="solved-ques-no">You Solved 10 questions of HTML</div>
                  <div class="right-wrong">3 Were Right and 4 were Wrong</div>
                  <div id="display-final-score">Your Final Score is: 35</div>
                  <div class="remark">Remark: Satisfactory, Keep trying.</div>
                  <button id="restart">Restart Quiz</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios'
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
  name: "Quizz",components:{
    Menu,Footer,Header
  }

}
</script>

<style scoped>


.choose-lang{
  text-decoration: none;
  color: black;
  background-color:#fff;
  margin-left: 30px;
  border: 2px solid #FF9933;
  padding: 15px;
  border-radius: 20px;
  font-family: monospace;
  /*    letter-spacing: 1.5px;*/
  /*    font-weight: 400;*/
  transition: background-color 0.3s,border 0.2s, color 0.2s;
}

.choose-lang:hover{
  background-color: #FF9933;
  color:#fff;
  cursor: pointer;
  /*    width: 120px;*/
  font-size: 110%;
}

#language{
  background-color:white;
  padding:12px;
  border-radius: 5px;
  cursor:pointer;
  border:2px solid black;


}

#language:hover{
  background-color:#fff;
}

#language option{
  background-color: #fff;

}
.quiz{
  background-color: #fff;
  text-align: center;
  /*    padding: 0%;*/
  margin-top: 20px;
  height: 100vh;
}

#info{
  height:25px;
  background-color: #fff;
}

#score{
  width:50%;
  float:left;
  font-size: 25px;

}

#ques-left{
  width:50%;
  float:left;
  font-size:25px;

}

#ques-view{
  /*    background-color:aqua;*/
  height: 35px;
  margin-top: 10px;
  padding: 2px;
}
.ques-circle{
  float: left;
  border-radius: 50%;
  width: 35px;
  height: 90%;
  margin-left: 10px;
  margin-top: 10px;
}
.correct{
  background-color: #2ecc71;
}
.incorrect{
  background-color: #fc5c65;
  color: #fff;
}

.question{
  /*    background-color: antiquewhite;*/
  font-family: 'Roboto Slab', sans-serif;

}

.choice{
  background-color: #fff;
  padding: 3%;

}


.options{
  background-color: #fff;
  display:block;
  margin-left: 13%;
  font-size: 25px;
  font-weight: 100;
  margin-top: 30px;
  text-align: left;
}

input[type=radio] {
  border: 5px solid white;
  width: 20px;
  height: 1.3em;
  float: left;
}

.ans-btn{
  background-color: #fff;
  padding: 2%;
}

.submit-answer{
  background-color:white;
  border: 2px solid #FF9933;
  padding: 15px;
  border-radius: 20px;
  font-family: monospace;
  transition: background-color 0.3s,border 0.2s, color 0.2s;
}

.submit-answer:hover{

  background-color: #FF9933;
  padding: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 20px;
}

.view-results{
  text-decoration: none;
  color: black;
  background-color:white;
  border: 2px solid #FF9933;
  padding: 15px;
  border-radius: 20px;
  font-family: monospace;
  transition: background-color 0.3s,border 0.2s, color 0.2s;
}

.view-results:hover{
  background-color: #FF9933;
  padding: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 20px;
}

/*Final Results*/

.final-result{
  background-color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 1.5em;
  height: 100vh;
}
.solved-ques-no{
  padding: 10px;
}

.right-wrong{
  padding: 10px;
}

#display-final-score{
  padding: 5%;
}
.remark{
  padding: 5%
}
#restart{
  background-color:#ff9933;
  margin-left: 30px;
  border: 2px solid #FF9933;
  padding: 15px;
  border-radius: 20px;
  font-size: 80%;
  transition: background-color 0.3s,border 0.2s, color 0.2s;
}

#restart:hover{
  background-color: #FF9933;
  color:#fff;
  cursor: pointer;
  /*    width: 120px;*/
  font-size: 90%;
}


@media only screen and (max-width: 1250px) {
  .options{
    margin-left: 8%
  }
}

@media only screen and (max-width: 850px) {
  .options{
    margin-left: 4%;
  }
}

@media only screen and (max-width: 650px) {
  .options{
    display: block;
    margin-top: 3%;

  }
}

@media only screen and (max-width: 550px) {
  .options{
    margin-top: 3%;

  }

  .choose-lang{
    display: block;
    margin-top: 25px;
    margin-left: 0px;
  }

  #language{
    display: block;
  }
}

</style>