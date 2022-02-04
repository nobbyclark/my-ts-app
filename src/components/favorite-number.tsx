import React from "react";

type Props = {
  min?: number;
  max?: number;
};

function FavoriteNumber({ min = 1, max = 9 }: Props) {
  const [number, setNumber] = React.useState(0);
  const [numberEntered, setNumberEntered] = React.useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNumber(Number(event.target.value));
    setNumberEntered(true);
  }

  const isValid = !numberEntered || (number >= min && number <= max);

  return (
    <div>
      <label htmlFor="favorite-number">Favorite Number</label>
      <input
        id="favorite-number"
        type="number"
        value={number}
        onChange={handleChange}
      />
      {isValid ? null : <div role="alert">The number is invalid</div>}
    </div>
  );
}

export { FavoriteNumber };
