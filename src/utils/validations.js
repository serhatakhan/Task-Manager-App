import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  // buradaki isimlendirmelerin initialValues'lerdeki isimlerle aynı olması gerekiyor
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
});

export {taskSchema};
