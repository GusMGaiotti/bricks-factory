export const getStatusDisplay = (status: string): string => {
  switch (status) {
    case "EM_INSPECAO":
      return "Em Inspeção";
    case "APROVADOS":
      return "Aprovado";
    case "REPROVADOS":
      return "Reprovado";
    default:
      return status;
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "EM_INSPECAO":
      return "bg-yellow-100 text-yellow-800";
    case "APROVADOS":
      return "bg-green-100 text-green-800";
    case "REPROVADOS":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};