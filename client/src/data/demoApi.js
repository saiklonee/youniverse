import {
    demoUser,
    demoClosetItems,
    demoDocuments,
    demoMoodMonth,
    demoHabits,
    demoAssets,
    demoSleepMonth,
    demoStudyMonth,
} from "./demoData";

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const demoApi = {
    me: async () => {
        await wait();
        return demoUser;
    },
    closet: async () => {
        await wait();
        return demoClosetItems;
    },
    documents: async () => {
        await wait();
        return demoDocuments;
    },
    sleepMonth: async () => {
        await new Promise((r) => setTimeout(r, 150));
        return demoSleepMonth;
    },
    studyMonth: async () => {
        await new Promise((r) => setTimeout(r, 150));
        return demoStudyMonth;
    },
    moodMonth: async () => {
        await new Promise((r) => setTimeout(r, 150));
        return demoMoodMonth;
    },
    habits: async () => {
        await wait();
        return demoHabits;
    },
    assets: async () => {
        await wait();
        return demoAssets;
    },
};
