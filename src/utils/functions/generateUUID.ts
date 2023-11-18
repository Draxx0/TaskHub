export const generateUUID = (): string => {
  const timestamp = new Date().getTime();
  const randomPart1 = Math.random() * 4294967296;
  const randomPart2 = Math.random() * 4294967296;

  const uuid = (
    ((timestamp & 0xfffffff) + randomPart1) &
    (0xfffffff + randomPart2) &
    0xfffffff
  ).toString(16);

  return (
    "00000000-0000-4000-8000-000000000000".replace(/0/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    ) + uuid
  );
};
