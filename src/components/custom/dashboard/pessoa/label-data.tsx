type LabelDataProps = {
  titulo: string;
  descricao: string;
};

export default function LabelData({ titulo, descricao }: LabelDataProps) {
  return (
    <div>
      <span className="">{titulo}: </span>
      <span className="font-semibold">{descricao}</span>
    </div>
  );
}
