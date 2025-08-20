export type Language = 'en' | 'vi' | 'ko';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    vi: 'Trang chủ',
    ko: '홈'
  },
  'nav.about': {
    en: 'About',
    vi: 'Giới thiệu',
    ko: '소개'
  },
  'nav.skills': {
    en: 'Skills',
    vi: 'Kỹ năng',
    ko: '기술'
  },
  'nav.projects': {
    en: 'Projects',
    vi: 'Dự án',
    ko: '프로젝트'
  },
  'nav.contact': {
    en: 'Contact',
    vi: 'Liên hệ',
    ko: '연락처'
  },

  // Header
  'header.greeting': {
    en: 'Hello, I\'m',
    vi: 'Xin chào, tôi là',
    ko: '안녕하세요, 저는'
  },
  'header.name': {
    en: 'Aleam Z',
    vi: 'Aleam Z',
    ko: 'Aleam Z'
  },
  'header.title': {
    en: 'Full-Stack Developer',
    vi: 'Lập trình viên Full-Stack',
    ko: '풀스택 개발자'
  },
  'header.description': {
    en: 'Passionate about creating innovative web solutions',
    vi: 'Đam mê tạo ra các giải pháp web sáng tạo',
    ko: '혁신적인 웹 솔루션을 만드는 것에 열정을 가짐'
  },
  // Home Section
  'home.greeting': {
    en: 'Hello World!',
    vi: 'Xin chào thế giới!',
    ko: '안녕하세요 세계!'
  },
  'home.subtitle': {
    en: 'Passionate Fullstack Developer with expertise in React and modern web technologies',
    vi: 'Lập trình viên Fullstack đam mê với chuyên môn về React và công nghệ web hiện đại',
    ko: 'React와 현대적인 웹 기술에 전문성을 가진 열정적인 풀스택 개발자'
  },
  'home.description': {
    en: 'I create digital experiences that combine cutting-edge technology with beautiful design. Specializing in React, TypeScript, Node.js, and ASP.NET development. Graduate from University of Greenwich with Bachelor of Information Technology.',
    vi: 'Tôi tạo ra những trải nghiệm kỹ thuật số kết hợp công nghệ tiên tiến với thiết kế đẹp mắt. Chuyên về phát triển React, TypeScript, Node.js và ASP.NET. Tốt nghiệp Đại học Greenwich với bằng Cử nhân Công nghệ Thông tin.',
    ko: '최첨단 기술과 아름다운 디자인을 결합한 디지털 경험을 만듭니다. React, TypeScript, Node.js 및 ASP.NET 개발을 전문으로 합니다. 그리니치 대학교 정보기술학사 졸업.'
  },
  'home.stats.experience': {
    en: 'Years Experience',
    vi: 'Năm kinh nghiệm',
    ko: '년 경험'
  },
  'home.stats.projects': {
    en: 'Projects Completed',
    vi: 'Dự án hoàn thành',
    ko: '완료된 프로젝트'
  },
  'home.stats.satisfaction': {
    en: 'Client Satisfaction',
    vi: 'Sự hài lòng khách hàng',
    ko: '고객 만족도'
  },
  'home.cta.viewWork': {
    en: 'View My Work',
    vi: 'Xem công việc của tôi',
    ko: '내 작업 보기'
  },
  'home.cta.getInTouch': {
    en: 'Get In Touch',
    vi: 'Liên hệ với tôi',
    ko: '연락하기'
  },
  'home.code.building': {
    en: 'Building amazing apps!',
    vi: 'Xây dựng những ứng dụng tuyệt vời!',
    ko: '놀라운 앱을 만드는 중!'
  },
  'home.code.learning': {
    en: 'Always learning new tech!',
    vi: 'Luôn học hỏi công nghệ mới!',
    ko: '항상 새로운 기술을 배우는 중!'
  },
  // Skills Section
  'skills.title': {
    en: 'My Skills',
    vi: 'Kỹ năng của tôi',
    ko: '내 기술'
  },
  'skills.subtitle': {
    en: 'Technologies and tools I use to bring ideas to life',
    vi: 'Công nghệ và công cụ tôi sử dụng để biến ý tưởng thành hiện thực',
    ko: '아이디어를 현실로 만드는 데 사용하는 기술과 도구'
  },
  'skills.view.3d': {
    en: '3D Showcase',
    vi: 'Trưng bày 3D',
    ko: '3D 쇼케이스'
  },
  'skills.view.grid': {
    en: 'Grid',
    vi: 'Lưới',
    ko: '그리드'
  },
  'skills.hobbies.title': {
    en: 'My Hobbies',
    vi: 'Sở thích của tôi',
    ko: '내 취미'
  },
  'skills.hobbies.travel': {
    en: 'Travel',
    vi: 'Phượt',
    ko: '여행'
  },
  'skills.hobbies.travel.desc': {
    en: 'Exploring new routes, experiencing culture and beautiful landscapes',
    vi: 'Khám phá những cung đường mới, trải nghiệm văn hóa và cảnh đẹp',
    ko: '새로운 경로 탐험, 문화와 아름다운 풍경 체험'
  },
  'skills.hobbies.football': {
    en: 'Football',
    vi: 'Bóng Đá',
    ko: '축구'
  },
  'skills.hobbies.football.desc': {
    en: 'Passionate about sports, fitness training and team spirit',
    vi: 'Đam mê thể thao, rèn luyện sức khỏe và tinh thần đồng đội',
    ko: '스포츠에 대한 열정, 피트니스 훈련 및 팀워크'
  },
  'skills.hobbies.gaming': {
    en: 'Gaming',
    vi: 'Gaming',
    ko: '게임'
  },
  'skills.hobbies.gaming.desc': {
    en: 'Enjoy strategy games and technology entertainment',
    vi: 'Thích thú với các game chiến thuật và giải trí công nghệ',
    ko: '전략 게임과 기술 엔터테인먼트를 즐김'
  },
  'skills.hobbies.farming': {
    en: 'Farming',
    vi: 'Farmer',
    ko: '농업'
  },
  'skills.hobbies.farming.desc': {
    en: 'Love gardening, caring for plants and nature',
    vi: 'Yêu thích trồng trọt, chăm sóc cây cối và thiên nhiên',
    ko: '정원 가꾸기, 식물과 자연 돌보기를 좋아함'
  },

  // Projects Section
  'projects.title': {
    en: 'My Projects',
    vi: 'Dự án của tôi',
    ko: '내 프로젝트'
  },
  'projects.subtitle': {
    en: 'Some of my recent work and personal projects',
    vi: 'Một số dự án gần đây và dự án cá nhân của tôi',
    ko: '최근 작업과 개인 프로젝트 중 일부'
  },
  'projects.view.live': {
    en: 'View Live',
    vi: 'Xem trực tiếp',
    ko: '라이브 보기'
  },
  'projects.view.source': {
    en: 'View Source',
    vi: 'Xem mã nguồn',
    ko: '소스 보기'
  },
  'projects.source.private': {
    en: 'Source code is private',
    vi: 'Mã nguồn là bảo mật',
    ko: '소스 코드는 비공개입니다'
  },
  'projects.filter.all': {
    en: 'All',
    vi: 'Tất cả',
    ko: '전체'
  },
  'projects.filter.frontend': {
    en: 'Frontend',
    vi: 'Frontend',
    ko: '프론트엔드'
  },
  'projects.filter.backend': {
    en: 'Backend',
    vi: 'Backend',
    ko: '백엔드'
  },
  'projects.filter.fullstack': {
    en: 'Full-Stack',
    vi: 'Full-Stack',
    ko: '풀스택'
  },
  'projects.preview.loading': {
    en: 'Loading preview…',
    vi: 'Đang tải xem trước…',
    ko: '미리보기 로딩 중…'
  },
  'projects.preview.unavailable': {
    en: 'Preview not available',
    vi: 'Không có bản xem trước',
    ko: '미리보기를 사용할 수 없습니다'
  },
  'projects.cta.text': {
    en: "Interested in working together? Let's discuss your project!",
    vi: 'Quan tâm hợp tác? Hãy trao đổi về dự án của bạn!',
    ko: '함께 작업하고 싶으신가요? 프로젝트에 대해 이야기해요!'
  },
  'projects.webStore.title': {
    en: 'Web Store',
    vi: 'Web Store',
    ko: '웹 스토어'
  },
  'projects.webStore.description': {
    en: 'Web Store is a platform for selling products online',
    vi: 'Web Store là nền tảng bán hàng trực tuyến',
    ko: '웹 스토어는 온라인으로 제품을 판매하는 플랫폼입니다'
  },
  'projects.salesManagement.title': {
    en: 'Sales Management',
    vi: 'Quản lý bán hàng',
    ko: '판매 관리'
  },
  'projects.salesManagement.description': {
    en: 'Sales Management is a platform for managing sales',
    vi: 'Quản lý bán hàng là nền tảng quản lý bán hàng',
    ko: '판매 관리는 판매를 관리하는 플랫폼입니다'
  },

  'projects.ciResearch.title': {
    en: 'CI Research Company Website',
    vi: 'Website Công ty Nghiên cứu CI',
    ko: 'CI 리서치 회사 웹사이트'
  },
  'projects.ciResearch.description': {
    en: 'Corporate website for CI Research with modern UI/UX',
    vi: 'Website doanh nghiệp cho CI Research với UI/UX hiện đại',
    ko: '현대적인 UI/UX를 갖춘 CI 리서치 기업 웹사이트'
  },
  'projects.amazingTech.title': {
    en: 'Amazing Tech Interface',
    vi: 'Giao diện Công ty Công nghệ Amazing',
    ko: '어메이징 테크 회사 인터페이스'
  },
  'projects.amazingTech.description': {
    en: 'Landing page interface with modular components',
    vi: 'Giao diện trang chủ với các component mô-đun',
    ko: '모듈형 컴포넌트로 구성된 랜딩 페이지 인터페이스'
  },
  'projects.portfolio.title': {
    en: 'Portfolio Website',
    vi: 'Website Portfolio',
    ko: '포트폴리오 웹사이트'
  },
  'projects.portfolio.description': {
    en: 'My personal portfolio built with React and TypeScript',
    vi: 'Portfolio cá nhân xây dựng với React và TypeScript',
    ko: 'React와 TypeScript로 만든 개인 포트폴리오'
  },
  'projects.maxius.title': {
    en: 'Maxius Frontend Test',
    vi: 'Maxius Frontend Test',
    ko: 'Maxius 프론트엔드 테스트'
  },
  'projects.maxius.description': {
    en: 'A frontend assessment featuring product listing, search and modern UI with Ant Design.',
    vi: 'Bài test frontend với danh sách sản phẩm, tìm kiếm và UI hiện đại dùng Ant Design.',
    ko: '제품 목록, 검색 및 Ant Design 기반의 모던 UI를 포함한 프론트엔드 과제.'
  },
  'projects.amanotes.title': {
    en: 'Amanotes Test Job',
    vi: 'Amanotes Test Job',
    ko: 'Amanotes 테스트 과제'
  },
  'projects.amanotes.description': {
    en: 'Music learning e-learning demo with search, filters, cart and AI assistant.',
    vi: 'Demo e-learning âm nhạc với tìm kiếm, bộ lọc, giỏ hàng và trợ lý AI.',
    ko: '검색, 필터, 장바구니 및 AI 어시스턴트를 포함한 음악 e-러닝 데모.'
  },

  'projects.ecommerce.title': {
    en: 'Ecommerce',
    vi: 'Ecommerce',
    ko: '이커머스'
  },

  'common.prev': {
    en: 'Previous',
    vi: 'Trước',
    ko: '이전'
  },
  'common.next': {
    en: 'Next',
    vi: 'Tiếp',
    ko: '다음'
  },

  // Contact Section
  'contact.title': {
    en: 'Get In Touch',
    vi: 'Liên hệ với tôi',
    ko: '연락하기'
  },
  'contact.subtitle': {
    en: 'Feel free to reach out for collaborations or just a friendly hello',
    vi: 'Hãy liên hệ để hợp tác hoặc chỉ để chào hỏi',
    ko: '협업이나 친근한 인사를 위해 언제든 연락하세요'
  },
  'contact.form.name': {
    en: 'Name',
    vi: 'Tên',
    ko: '이름'
  },
  'contact.form.email': {
    en: 'Email',
    vi: 'Email',
    ko: '이메일'
  },
  'contact.form.message': {
    en: 'Message',
    vi: 'Tin nhắn',
    ko: '메시지'
  },
  'contact.form.send': {
    en: 'Send Message',
    vi: 'Gửi tin nhắn',
    ko: '메시지 보내기'
  },
  'contact.location.title': {
    en: 'Location',
    vi: 'Địa chỉ',
    ko: '위치'
  },
  'contact.location.value': {
    en: 'Thu Duc City',
    vi: 'Thành phố Thủ Đức',
    ko: '투득시'
  },
  'contact.phone.title': {
    en: 'Phone',
    vi: 'Điện thoại',
    ko: '전화'
  },
  'contact.phone.call': {
    en: 'Call Now',
    vi: 'Gọi ngay',
    ko: '지금 전화'
  },
  'contact.email.title': {
    en: 'Email',
    vi: 'Email',
    ko: '이메일'
  },
  'contact.email.send': {
    en: 'Send Email',
    vi: 'Gửi email',
    ko: '이메일 보내기'
  },
  'contact.linkedin.title': {
    en: 'LinkedIn',
    vi: 'LinkedIn',
    ko: '링크드인'
  },
  'contact.linkedin.description': {
    en: 'Connect with me professionally',
    vi: 'Kết nối với tôi về mặt chuyên môn',
    ko: '전문적으로 연결하기'
  },
  'contact.linkedin.view': {
    en: 'View Profile',
    vi: 'Xem hồ sơ',
    ko: '프로필 보기'
  },
  'contact.github.title': {
    en: 'GitHub',
    vi: 'GitHub',
    ko: '깃허브'
  },
  'contact.github.description': {
    en: 'Check out my code and projects',
    vi: 'Xem code và dự án của tôi',
    ko: '내 코드와 프로젝트 확인하기'
  },
  'contact.github.visit': {
    en: 'Visit GitHub',
    vi: 'Truy cập GitHub',
    ko: '깃허브 방문'
  },
  'contact.footer.message': {
    en: "Let's build something amazing together! 🚀",
    vi: 'Hãy cùng nhau xây dựng điều tuyệt vời! 🚀',
    ko: '함께 멋진 것을 만들어봐요! 🚀'
  },
  'contact.footer.description': {
    en: 'Fullstack Developer with 2+ years experience in React, Node.js, and ASP.NET.',
    vi: 'Fullstack Developer với hơn 2 năm kinh nghiệm về React, Node.js và ASP.NET.',
    ko: 'React, Node.js, ASP.NET에서 2년 이상의 경험을 가진 풀스택 개발자.'
  },

  // Common
  'common.loading': {
    en: 'Loading...',
    vi: 'Đang tải...',
    ko: '로딩 중...'
  },
  'common.error': {
    en: 'Error',
    vi: 'Lỗi',
    ko: '오류'
  },
  'common.close': {
    en: 'Close',
    vi: 'Đóng',
    ko: '닫기'
  },
  'common.open': {
    en: 'Open',
    vi: 'Mở',
    ko: '열기'
  }
};

export const getText = (key: string, language: Language): string => {
  return translations[key]?.[language] || key;
};

export const getCurrentLanguage = (): Language => {
  const saved = localStorage.getItem('language');
  if (saved && ['en', 'vi', 'ko'].includes(saved)) {
    return saved as Language;
  }

  // Auto-detect language based on browser
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('vi')) return 'vi';
  if (browserLang.startsWith('ko')) return 'ko';
  return 'en';
};

export const setLanguage = (language: Language): void => {
  localStorage.setItem('language', language);
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
};
