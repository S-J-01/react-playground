export const List = ({ itemList }) => {
  return (
    <div>
      {itemList.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};
