export function shortenString(str: string, length?: number): string {
    if (str.length <= (length || 8)) {
      return str;
    }
    const start = str.slice(0, 4);
    const end = str.slice(-4);
    return `${start}...${end}`;
  }
  export function wait(seconds = 10) {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }