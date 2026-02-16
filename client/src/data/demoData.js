export const demoUser = {
    id: "u1",
    name: "Sai Prithvi",
    email: "sai@example.com",
};

export const demoClosetItems = [
    { id: "c1", name: "Black Hoodie", category: "Topwear", lastWorn: "2026-02-10", condition: "Good" },
    { id: "c2", name: "White Sneakers", category: "Footwear", lastWorn: "2026-02-15", condition: "Great" },
    { id: "c3", name: "Blue Jeans", category: "Bottomwear", lastWorn: "2026-02-12", condition: "Good" },
];

export const demoDocuments = [
    { id: "d1", title: "Aadhaar Card", type: "ID", expiresOn: null, tags: ["Important"] },
    { id: "d2", title: "Driving License", type: "ID", expiresOn: "2027-04-01", tags: ["Expiry"] },
    { id: "d3", title: "College Certificate", type: "Education", expiresOn: null, tags: ["Docs"] },
];

export const MOOD_SCALE = [
    { value: 1, label: "Low", emoji: "😣" },
    { value: 2, label: "Meh", emoji: "😕" },
    { value: 3, label: "Okay", emoji: "😐" },
    { value: 4, label: "Good", emoji: "🙂" },
    { value: 5, label: "Great", emoji: "😁" },
];

// Month-based mood logs (score 1–5)
export const demoMoodMonth = {
    monthKey: "2026-02", // YYYY-MM
    entries: [
        { day: 1, score: 3, note: "Normal day" },
        { day: 2, score: 4, note: "Good work" },
        { day: 3, score: 2, note: "Low energy" },
        { day: 4, score: 3, note: "" },
        { day: 5, score: 5, note: "Best day" },
        { day: 6, score: 4, note: "" },
        { day: 7, score: 3, note: "" },
        { day: 8, score: 2, note: "Stressed" },
        { day: 9, score: 3, note: "" },
        { day: 10, score: 4, note: "" },
        { day: 11, score: 3, note: "" },
        { day: 12, score: 4, note: "Productive" },
        { day: 13, score: 3, note: "" },
        { day: 14, score: 5, note: "Great vibes" },
        { day: 15, score: 2, note: "Tired" },
        { day: 16, score: 3, note: "" },
        { day: 17, score: 4, note: "" },
        { day: 18, score: 4, note: "" },
        { day: 19, score: 3, note: "" },
        { day: 20, score: 2, note: "" },
        { day: 21, score: 3, note: "" },
        { day: 22, score: 4, note: "" },
        { day: 23, score: 5, note: "" },
        { day: 24, score: 3, note: "" },
        { day: 25, score: 4, note: "" },
        { day: 26, score: 3, note: "" },
        { day: 27, score: 2, note: "" },
        { day: 28, score: 4, note: "" },
    ],
};


export const demoHabits = [
    { id: "h1", title: "Water 2L", streak: 6, doneToday: true },
    { id: "h2", title: "10 min walk", streak: 3, doneToday: false },
    { id: "h3", title: "No sugar", streak: 2, doneToday: false },
];

export const demoAssets = [
    { id: "a1", title: "Laptop", brand: "HP", warrantyEnds: "2027-01-10" },
    { id: "a2", title: "Earbuds", brand: "OnePlus", warrantyEnds: "2026-11-20" },
];


// Sleep log month (start/end in 24h decimal, supports crossing midnight)
export const demoSleepMonth = {
    monthKey: "2026-02",
    entries: [
        { day: 1, sleepStart: 23.5, wakeEnd: 7.2 },  // 23:30 -> 07:12
        { day: 2, sleepStart: 0.3, wakeEnd: 8.0 },   // 00:18 -> 08:00
        { day: 3, sleepStart: 1.1, wakeEnd: 7.0 },
        { day: 4, sleepStart: 23.9, wakeEnd: 6.6 },
        { day: 5, sleepStart: 0.8, wakeEnd: 9.2 },
        { day: 6, sleepStart: 0.4, wakeEnd: 7.7 },
        { day: 7, sleepStart: 2.0, wakeEnd: 8.4 },
        { day: 8, sleepStart: 23.2, wakeEnd: 6.3 },
        { day: 9, sleepStart: 0.9, wakeEnd: 7.1 },
        { day: 10, sleepStart: 1.4, wakeEnd: 8.6 },
        { day: 11, sleepStart: 23.7, wakeEnd: 6.8 },
        { day: 12, sleepStart: 0.6, wakeEnd: 7.9 },
        { day: 13, sleepStart: 1.9, wakeEnd: 8.1 },
        { day: 14, sleepStart: 0.2, wakeEnd: 9.0 },
        { day: 15, sleepStart: 2.3, wakeEnd: 7.0 },
        { day: 16, sleepStart: 23.4, wakeEnd: 6.9 },
        { day: 17, sleepStart: 0.5, wakeEnd: 8.0 },
        { day: 18, sleepStart: 1.2, wakeEnd: 7.4 },
        { day: 19, sleepStart: 0.0, wakeEnd: 8.2 },
        { day: 20, sleepStart: 23.8, wakeEnd: 6.4 },
        { day: 21, sleepStart: 1.0, wakeEnd: 7.5 },
        { day: 22, sleepStart: 0.7, wakeEnd: 8.8 },
        { day: 23, sleepStart: 2.1, wakeEnd: 7.2 },
        { day: 24, sleepStart: 23.6, wakeEnd: 6.7 },
        { day: 25, sleepStart: 0.4, wakeEnd: 8.1 },
        { day: 26, sleepStart: 1.6, wakeEnd: 7.0 },
        { day: 27, sleepStart: 0.9, wakeEnd: 9.1 },
        { day: 28, sleepStart: 2.0, wakeEnd: 7.6 },
    ],
};

// Study log month (hours studied per day)
export const demoStudyMonth = {
    monthKey: "2026-02",
    entries: [
        { day: 1, hours: 2.0 },
        { day: 2, hours: 1.2 },
        { day: 3, hours: 3.5 },
        { day: 4, hours: 0.0 },
        { day: 5, hours: 2.7 },
        { day: 6, hours: 1.0 },
        { day: 7, hours: 4.0 },
        { day: 8, hours: 2.2 },
        { day: 9, hours: 1.8 },
        { day: 10, hours: 3.0 },
        { day: 11, hours: 2.4 },
        { day: 12, hours: 0.8 },
        { day: 13, hours: 2.0 },
        { day: 14, hours: 3.2 },
        { day: 15, hours: 1.0 },
        { day: 16, hours: 2.6 },
        { day: 17, hours: 3.8 },
        { day: 18, hours: 0.0 },
        { day: 19, hours: 1.7 },
        { day: 20, hours: 2.3 },
        { day: 21, hours: 4.5 },
        { day: 22, hours: 2.0 },
        { day: 23, hours: 1.4 },
        { day: 24, hours: 3.1 },
        { day: 25, hours: 2.8 },
        { day: 26, hours: 0.6 },
        { day: 27, hours: 3.0 },
        { day: 28, hours: 2.1 },
    ],
};
