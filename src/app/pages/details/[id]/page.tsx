export default function detail({ params }: { params: { id: number } }) {
  return (
    <>
      {params.id}
    </>
  );
};