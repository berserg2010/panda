const _courses = [
  { student: '1', teacher: '10' },
  { student: '1', teacher: '11' },
  { student: '2', teacher: '10' },
  { student: '3', teacher: '11' },
  { student: '1', teacher: '12' },
]


const _users = [
  { id: '1', username: 'student_1' },
  { id: '2', username: 'student_2' },
  { id: '3', username: 'student_3' },
  { id: '10', username: 'teacher_1' },
  { id: '11', username: 'teacher_2' },
  { id: '12', username: 'teacher_3' },
]

const _messages = [
  { fromUser: '1', toUser: '10', message: 'Hello, Allis', datetime: '01.01.2021 15:00:00' },
  { fromUser: '10', toUser: '1', message: 'Hello, Ivan', datetime: '01.01.2021 15:01:00' },
  { fromUser: '1', toUser: '10', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam assumenda doloribus, facere in natus obcaecati qui repudiandae! Architecto aspernatur assumenda atque consequatur dolorum enim, fuga iure recusandae tempore temporibus voluptates.', datetime: '01.01.2021 15:05:00' },
  { fromUser: '1', toUser: '10', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam assumenda doloribus, facere in natus obcaecati qui repudiandae! Architecto aspernatur assumenda atque consequatur dolorum enim, fuga iure recusandae tempore temporibus voluptates.', datetime: '01.01.2021 15:10:00' },
  { fromUser: '10', toUser: '1', message: 'Ok', datetime: '01.01.2021 15:16:00' },
  { fromUser: '1', toUser: '10', message: 'By', datetime: '01.01.2021 15:17:00' },
  { fromUser: '1', toUser: '11', message: 'By', datetime: '01.01.2021 15:21:00' },
  { fromUser: '2', toUser: '10', message: 'By', datetime: '01.01.2021 15:22:00' },
]


export const getInterlocutorsId = (arrayCourses, currentUserId) => {
  return new Set(arrayCourses.map((el) => {
    if (el.student === currentUserId) {
      return el.teacher
    } else if (el.teacher === currentUserId) {
      return el.student
    }
  }))
};

export const filterInterlocutors = (arrayUsers, arrayUsersId) => {
  return arrayUsers.filter((user) => arrayUsersId.has(user.id))
};

export const filterMessages = (arrayMessages, currentUserId) => {
  return arrayMessages.filter((event) => event.fromUser === currentUserId || event.toUser === currentUserId)
};


export default {
  getInterlocutors(cb, currentUserId) {
    // axios.get('https://jsonplaceholder.typicode.com/users')
    //   .then((response) => {
    //     cb(response.data)
    //   })
    setTimeout(() => cb(
      filterInterlocutors(_users, getInterlocutorsId(_courses, currentUserId))
    ), 100)
  },
  getMessages(cb, currentUserId) {
    setTimeout(() => cb(
      filterMessages(_messages, currentUserId)
    ), 100)
  },
};
