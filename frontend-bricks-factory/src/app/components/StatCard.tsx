import { BrickStatisticsDTO } from "@/types/bricks";

interface StatCardProps {
  statName: keyof BrickStatisticsDTO;
  value: number;
}

export default function StatCard({ statName, value }: StatCardProps) {
  const formatStatName = (key: keyof BrickStatisticsDTO) => {
    const names: Record<keyof BrickStatisticsDTO, string> = {
      whiteBricksEvenHoles: "Tijolos Brancos com Furos Pares",
      whiteBricksOddHoles: "Tijolos Brancos com Furos Ímpares",
      blackBricksEvenHoles: "Tijolos Pretos com Furos Pares",
      blackBricksOddHoles: "Tijolos Pretos com Furos Ímpares",
      whiteBricksTotal: "Total de Tijolos Brancos",
      blackBricksTotal: "Total de Tijolos Pretos",
      bricksInInspection: "Total de Tijolos em Inspeção",
      bricksApproved: "Total de Tijolos Aprovados",
      bricksRejected: "Total de Tijolos Reprovados",
      bricksDefective: "Total de Tijolos com Defeito",
    };
    return names[key] || key;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-sm font-medium text-gray-500">{formatStatName(statName)}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}