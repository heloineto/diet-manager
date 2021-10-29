import MainShell from '@components/layout/app-shells/MainShell';
import Calendar from '@components/elements/Calendar';
import Meals from '@components/elements/Meals';
import { useMediaQuery, useTheme } from '@material-ui/core';

const Diary: NextPage = () => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  return (
    <MainShell aside={<Calendar />}>
      {compact && <Calendar className="mb-5" expanded={false} />}
      <Meals />
    </MainShell>
  );
};

export default Diary;
