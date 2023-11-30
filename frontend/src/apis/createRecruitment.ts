import userInstance from '@config/userInstance';

type CreateRecruitment = (
  themeId: number,
  recruitmentContent: string,
  appointmentDate: Date,
  appointmentCompleted: boolean,
  recruitmentMembers: number
) => Promise<any>;

const createRecruitment: CreateRecruitment = async (
  themeId,
  recruitmentContent,
  appointmentDate,
  appointmentCompleted,
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
        appointmentCompleted,
        recruitmentMembers,
      },
    })
  ).data;
};

export default createRecruitment;
