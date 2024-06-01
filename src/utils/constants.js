import {
  ChartCircle,
  Clock,
  CloseCircle,
  TickCircle,
} from 'iconsax-react-native';
import AppColors from '../theme/colors';

const status = {
  ONGOING: 1,
  PENDING: 2,
  COMPLETED: 3,
  CANCEL: 4,
};

const taskValues = [
  {
    status: 1,
    title: 'Ongoing',
    color: AppColors.ONGOING,
    icon: <ChartCircle size="24" color={AppColors.WHITE} />,
  },
  {
    status: 2,
    title: 'Pending',
    color: AppColors.PENDING,
    icon: <Clock size="24" color={AppColors.WHITE} />,
  },
  {
    status: 3,
    title: 'Completed',
    color: AppColors.COMPLETED,
    icon: <TickCircle size="24" color={AppColors.WHITE} />,
  },
  {
    status: 4,
    title: 'Cancel',
    color: AppColors.CANCEL,
    icon: <CloseCircle size="24" color={AppColors.WHITE} />,
  },
];

export {status, taskValues};
