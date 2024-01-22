import Chat from "@src/app/components/layout/Chat";

type Props = {
  params: {
    id: string
  }
};

export default function Page ({params}: Props) {
  return <Chat toUid={params.id}/>
}
