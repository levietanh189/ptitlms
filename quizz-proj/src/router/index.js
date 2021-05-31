import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/auth/Login";
import NotFound from "@/views/NotFound";
import Register from "@/views/auth/Register";
import Confirm from "@/views/auth/Confirm";
import Quizz from "@/views/student/Quizz";
import ClassAdd from "@/views/admin/class/ClassAdd";
import ClassList from "@/views/admin/class/ClassList";
import ExamList from "@/views/admin/exam/ExamList";
import ExamAdd from "@/views/admin/exam/ExamAdd";
import Home from "@/views/admin/Home";
import ExamDetail from "@/views/admin/exam/ExamDetail";
import AnswerAdd from "@/views/admin/exam/AnswerAdd";
import StudentClassList from "@/views/student/class/StudentClassList";
import StudentJoinClass from "@/views/student/class/StudentJoinClass";
import StudenExamList from "@/views/student/exam/StudenExamList";
import StudentDoExam from "@/views/student/exam/StudentDoExam";
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/confirm/:id',
    name: 'Confirm',
    component: Confirm
  },
  {
    path: '/confirm/:id',
    name: 'Confirm',
    component: Confirm,
    props:true
  },
  {
    path: '/quizz',
    name: 'Quizz',
    component: Quizz
  },
  {
    path: '/exam/:id',
    name: 'ExamList',
    component: ExamList
  },
  {
    path: '/add-exam/:id',
    name: 'ExamAdd',
    component: ExamAdd
  },
  {
    path: '/add-answer/:id',
    name: 'AnswerAdd',
    component: AnswerAdd
  },
  {
    path: '/detail-exam/:id',
    name: 'ExamDetail',
    component: ExamDetail
  },
  {
    path: '/add-class',
    name: 'ClassAdd',
    component:ClassAdd
  },
  {
    path: '/class',
    name: 'ClassList',
    component:ClassList
  },
  {
    path: '/studentclass',
    name: 'StudentClassList',
    component:StudentClassList
  },
  {
    path: '/joinclass',
    name: 'StudentJoinClass',
    component:StudentJoinClass
  },
  {
    path: '/studentexam/:id',
    name: 'StudenExamList',
    component: StudenExamList
  },
  {
    path: '/doexam/:id',
    name: 'StudentDoExam',
    component: StudentDoExam
  },
  {
    path:'/catchAll(.*)',
    name:'NotFound',
    component:NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
