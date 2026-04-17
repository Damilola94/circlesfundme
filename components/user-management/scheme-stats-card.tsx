export const SchemeStatsCard = ({
  name,
  total,
  active,
  inactive,
}: {
  name: string;
  total: number;
  active: number;
  inactive: number;
}) => {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-2 font-outfit">
      <h3 className="font-semibold text-gray-800">{name}</h3>

      <div className="flex justify-between text-sm">
        <span>Total</span>
        <span className="font-medium">{total}</span>
      </div>

      <div className="flex justify-between text-sm text-green-600">
        <span>Active</span>
        <span className="font-medium">{active}</span>
      </div>

      <div className="flex justify-between text-sm text-red-500">
        <span>Inactive</span>
        <span className="font-medium">{inactive}</span>
      </div>
    </div>
  );
};