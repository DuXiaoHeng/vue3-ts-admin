interface Tab {
    name: string;
    title: string;
}

interface RightMenuOpton {
    show: boolean
    offsetTop: number
    offsetLeft: number
    activeTab: string
}

export {
    Tab,
    RightMenuOpton,
}