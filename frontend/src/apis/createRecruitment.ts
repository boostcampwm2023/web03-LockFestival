import userInstance from '@config/userInstance';

type CreateRecruitment = (
  themeId: number,
  recruitmentContent: string,
  appointmentDate: Date,
  recruitmentCompleted: boolean,
  recruitmentMembers: number
) => Promise<any>;

const createRecruitment: CreateRecruitment = async (
  themeId,
  recruitmentContent,
  appointmentDate,
  recruitmentCompleted,
  recruitmentMembers
) => {
  return (
    await userInstance({
      method: 'post',
      url: '/groups',
      data: {
        themeId,
        recruitmentContent,
        appointmentDate,
        recruitmentCompleted,
        recruitmentMembers,
      },
    })
  ).data;
};

export default createRecruitment;
