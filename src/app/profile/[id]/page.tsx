export default function ProfilePage({ params }: { params: { id: string } }) {
  console.log(params.id);
  return <div>Hello World! User Id: {params.id}</div>;
}
