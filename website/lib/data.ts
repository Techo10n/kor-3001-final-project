export const TITLES = [
  // Family: Parents & Grandparents
  { situation: "Mom (Casual)", title: "엄마" },
  { situation: "Dad (Casual)", title: "아빠" },
  { situation: "Mother (Formal)", title: "어머니" },
  { situation: "Father (Formal)", title: "아버지" },
  { situation: "Mother (Honorific)", title: "어머님" },
  { situation: "Father (Honorific)", title: "아버님" },
  { situation: "Grandmother (Paternal)", title: "할머니" },
  { situation: "Grandfather (Paternal)", title: "할아버지" },
  { situation: "Grandmother (Maternal)", title: "외할머니" },
  { situation: "Grandfather (Maternal)", title: "외할아버지" },

  // Family: Siblings (Male Speaker)
  { situation: "Older Brother (Male Speaker)", title: "형" },
  { situation: "Older Brother (Formal, Male Speaker)", title: "형님" },
  { situation: "Older Sister (Male Speaker)", title: "누나" },
  { situation: "Older Sister (Formal, Male Speaker)", title: "누님" },
  { situation: "Younger Sibling", title: "동생" },

  // Family: Siblings (Female Speaker)
  { situation: "Older Brother (Female Speaker)", title: "오빠" },
  { situation: "Older Sister (Female Speaker)", title: "언니" },

  // Family: Relatives (Aunts & Uncles)
  { situation: "Father's Sister (Aunt)", title: "고모" },
  { situation: "Father's Sister's Husband", title: "고모부" },
  { situation: "Mother's Sister (Aunt)", title: "이모" },
  { situation: "Mother's Sister's Husband", title: "이모부" },
  { situation: "Father's Brother (Unmarried)", title: "삼촌" },
  { situation: "Father's Older Brother", title: "큰아버지" },
  { situation: "Father's Older Brother's Wife", title: "큰어머니" },
  { situation: "Father's Younger Brother (Married)", title: "작은아버지" },
  { situation: "Father's Younger Brother's Wife", title: "작은어머니, 숙모" },

  // Family: Cousins & Nephews
  { situation: "Cousin", title: "사촌" },
  { situation: "Maternal Cousin", title: "외사촌" },
  { situation: "Nephew / Niece", title: "조카" },

  // In-Laws (Male Speaker)
  { situation: "Father-in-law (Wife's Father)", title: "장인어른" },
  { situation: "Mother-in-law (Wife's Mother)", title: "장모님" },
  { situation: "Wife's Older Brother", title: "형님" },
  { situation: "Wife's Younger Brother", title: "처남" },
  { situation: "Wife's Older Sister", title: "처형" },
  { situation: "Wife's Younger Sister", title: "처제" },
  { situation: "Older Brother's Wife", title: "형수님" },
  { situation: "Younger Brother's Wife", title: "제수씨" },
  { situation: "Older Sister's Husband", title: "매형" },

  // In-Laws (Female Speaker)
  { situation: "Father-in-law (Husband's Father)", title: "시아버님" },
  { situation: "Mother-in-law (Husband's Mother)", title: "시어머님" },
  { situation: "Husband's Older Brother", title: "아주버님" },
  { situation: "Husband's Younger Brother (Unmarried)", title: "도련님" },
  { situation: "Husband's Younger Brother (Married)", title: "서방님" },
  { situation: "Husband's Sister", title: "아가씨" },
  { situation: "Husband's Older Sister (Formal)", title: "형님" },
  { situation: "Brother's Wife", title: "올케" },

  // In-Laws (General)
  { situation: "Spouse's Sibling's Spouse", title: "동서" },
  { situation: "Sister's Husband (General)", title: "서방 (e.g., 김 서방)" },

  // Spouse / Lover
  { situation: "Honey / Dear (Spouse)", title: "여보, 당신" },
  { situation: "Darling / Honey (Couples)", title: "자기, 자기야" },

  // Social / Workplace
  { situation: "Friend's Mother", title: "어머님, 어머니, 이모 (Informal)" },
  { situation: "Friend's Father", title: "아버님, 아버지" },
  { situation: "Senior (School/Work)", title: "선배, 선배님" },
  { situation: "Junior (School/Work)", title: "후배" },
  { situation: "Teacher / Sir / Ma'am", title: "선생님" },
  { situation: "Professor", title: "교수님" },
  { situation: "Director / Head", title: "원장님" },
  { situation: "Teaching Assistant", title: "조교님" },
  { situation: "Chairman", title: "회장님" },
  { situation: "CEO / President", title: "사장님" },
  { situation: "Department Head", title: "부장님" },
  { situation: "Manager", title: "과장님" },
  { situation: "Driver (Taxi/Bus)", title: "기사님" },
  { situation: "Singer", title: "가수" },

  // Strangers / General
  { situation: "Excuse me (To get attention)", title: "저기요" },
  { situation: "Young Lady", title: "아가씨" },
  { situation: "Student", title: "학생" },
  { situation: "Middle-aged Man", title: "아저씨" },
  { situation: "Middle-aged Woman", title: "아주머니" },
  { situation: "Elder", title: "어르신" },
  { situation: "Ma'am / Madam", title: "사모님" },
  { situation: "Elderly Woman", title: "할머니" },
  { situation: "Elderly Man", title: "할아버지" },

  // Honorifics for Others' Family
  { situation: "Children (Honorific)", title: "자녀(분), 자제분" },
  { situation: "Daughter (Honorific)", title: "따님" },
  { situation: "Son (Honorific)", title: "아드님" },
  { situation: "Husband (Honorific)", title: "남편분" },
  { situation: "Wife of Superior", title: "사모님" },

  // Suffixes
  { situation: "Mr. / Ms.", title: "씨" },
  { situation: "Hey (Casual Suffix)", title: "야" },
];

export const GESTURES = [
  {
    title: "누군가를 오라고 부름",
    description: "손바닥을 아래로 향하게 하고 손가락을 안쪽으로 흔들어요",
    meaning: "Calling someone to come",
    image: "/images/gestures/come_here.png"
  },
  {
    title: "승리",
    description: "두 손가락(검지와 중지)을 펴서 V자 모양을 만들어요",
    meaning: "Victory / Peace sign",
    image: "/images/gestures/victory.png"
  },
  {
    title: "OK",
    description: "엄지와 검지 손가락으로 동그라미를 만들어요",
    meaning: "OK sign",
    image: "/images/gestures/ok_sign.png"
  },
  {
    title: "잘했어 할 때",
    description: "엄지 손가락을 들어요",
    meaning: "When saying \"good job\"",
    image: "/images/gestures/good_job.png"
  },
  {
    title: "너 미쳤니?",
    description: "검지 손가락으로 머리 옆을 돌리듯이 해요",
    meaning: "\"Are you crazy?\"",
    image: "/images/gestures/crazy.png"
  },
  {
    title: "숫자를 셀 때",
    description: "먼저 손을 다 펴고 엄지부터 하나씩 접어요",
    meaning: "When counting numbers",
    image: "/images/gestures/counting.png"
  },
  {
    title: "전화해~ 할 때",
    description: "엄지 손가락과 새끼 손가락으로 전화 모양을 만들어서 귀에 대요",
    meaning: "When saying \"call me\"",
    image: "/images/gestures/call_me.png"
  },
  {
    title: "아니라고 할 때",
    description: "두 손으로 X를 만들어요",
    meaning: "When saying \"no\"",
    image: "/images/gestures/no_sign.png"
  },
  {
    title: "'비밀이야' 할 때",
    description: "검지 손가락을 입에 대요",
    meaning: "When saying \"it's a secret\"",
    image: "/images/gestures/secret.png"
  },
  {
    title: "인사할 때",
    description: "머리를 숙여서 인사해요",
    meaning: "When greeting",
    image: "/images/gestures/bow.png"
  },
  {
    title: "어떤 사람이 화났다고 할 때",
    description: "두 손을 써서 검지 손가락을 머리 위에 올려요",
    meaning: "When saying someone is angry",
    image: "/images/gestures/angry.png"
  },
  {
    title: "약속할 때",
    description: "서로 새끼 손가락을 걸어요",
    meaning: "When making a promise (Pinky promise)",
    image: "/images/gestures/promise.png"
  },
  {
    title: "눈을 쳐다보다",
    description: "눈을 마주쳐요",
    meaning: "Making eye contact",
    image: "/images/gestures/eye_contact.png"
  },
  {
    title: "손을 잡다",
    description: "손을 잡아요",
    meaning: "Holding hands",
    image: "/images/gestures/holding_hands.png"
  },
  {
    title: "머리를 흔들다",
    description: "머리를 좌우로 흔들어요",
    meaning: "Shaking head",
    image: "/images/gestures/shake_head.png"
  },
  {
    title: "(껴)안다",
    description: "팔을 벌려 안아요",
    meaning: "Hugging",
    image: "/images/gestures/hug.png"
  },
  {
    title: "(머리를) 끄덕이다",
    description: "머리를 위아래로 움직여요",
    meaning: "Nodding (head)",
    image: "/images/gestures/nod.png"
  },
  {
    title: "(손가락으로) 가리키다",
    description: "손가락으로 방향을 가리켜요",
    meaning: "Pointing (with finger)",
    image: "/images/gestures/point.png"
  },
  {
    title: "팔짱을 끼다",
    description: "팔을 교차해요",
    meaning: "Crossing arms",
    image: "/images/gestures/cross_arms.png"
  },
  {
    title: "머리를 숙이다",
    description: "머리를 아래로 숙여요",
    meaning: "Bowing head",
    image: "/images/gestures/bow_head.png"
  },
  {
    title: "손가락 하트",
    description: "엄지와 검지를 교차해서 작은 하트 모양을 만들어요",
    meaning: "Finger heart",
    image: "/images/gestures/finger_heart.png"
  },
  {
    title: "두 엄지 올리기",
    description: "양손의 엄지를 올려서 매우 좋다는 것을 표현해요",
    meaning: "Double thumbs up",
    image: "/images/gestures/double_thumbs_up.png"
  }
];
