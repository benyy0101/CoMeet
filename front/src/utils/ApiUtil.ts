// 인터페이스를 받아서 쿼리스트링으로 변환
export function makeQuerystring(obj: any): string {
  const querystring: string[] = [];
  for (const key in obj) {
    const value = obj[key as keyof any];
    querystring.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  }
  return `?${querystring.join("&")}`;
}
