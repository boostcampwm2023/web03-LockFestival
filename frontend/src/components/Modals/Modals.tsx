import useModal from '@hooks/useModal';

const Modals = () => {
  const { modals } = useModal();

  return (
    <>
      {modals.map(({ Component, props }, index) => {
        return <Component key={index} {...props} />;
      })}
    </>
  );
};

export default Modals;
