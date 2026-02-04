class GoogleMeetCodeGenerator {
  constructor() {
    this.max3 = Math.pow(26, 3);
    this.max4 = Math.pow(26, 4);

    // Random starting point
    this.prefix = Math.floor(Math.random() * this.max3);
    this.middle = Math.floor(Math.random() * this.max4);
    this.suffix = Math.floor(Math.random() * this.max3);
  }

  // Convert number to base-26 string
  toBase26(n, length) {
    const chars = [];
    while (n > 0) {
      chars.push(String.fromCharCode(97 + (n % 26)));
      n = Math.floor(n / 26);
    }
    while (chars.length < length) chars.push('a');
    return chars.reverse().join('');
  }

  // Deterministic pseudo-random “middle jumps” for Google Meet style
  permuteMiddle(n) {
    // Split number into digits
    const a = Math.floor(n / (26*26*26)) % 26;
    const b = Math.floor(n / (26*26)) % 26;
    const c = Math.floor(n / 26) % 26;
    const d = n % 26;

    // Apply small deterministic jumps
    const pa = (a + b) % 26;
    const pb = (b + d) % 26;
    const pc = (c + a) % 26;
    const pd = (d + c) % 26;

    return String.fromCharCode(97+pa,97+pb,97+pc,97+pd);
  }

  next() {
    const middleBlock = this.permuteMiddle(this.middle);
    const code = `${this.toBase26(this.prefix,3)}-${middleBlock}-${this.toBase26(this.suffix,3)}`;

    // Increment suffix → middle → prefix
    this.suffix += 1;
    if (this.suffix >= this.max3) {
      this.suffix = 0;
      this.middle += 1;
      if (this.middle >= this.max4) {
        this.middle = 0;
        this.prefix += 1;
        if (this.prefix >= this.max3) this.prefix = 0;
      }
    }

    return code;
  }
}

// ================= Example Usage =================
const generator = new GoogleMeetCodeGenerator();

for (let i = 0; i < 60; i++) {
  console.log(generator.next());
}
