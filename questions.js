// =====================================================================
// CS 복습 상자 — 문제 은행
// ---------------------------------------------------------------------
// 문제를 추가하려면 CS_QUESTIONS 배열에 객체 하나를 더 넣으면 된다.
//
// 공통 필드
//   id       : 고유 문자열 (기록 저장 키라서 한번 정하면 바꾸지 말 것)
//   topic    : CS_TOPICS 의 key
//   concept  : 개념 이름 (카드 위쪽에 표시)
//   tier     : 'core'(핵심) | 'good'(있으면 좋음) | 'later'(나중에)
//   level    : 1 = 알아보기, 2 = 이해, 3 = 설명
//   type     : 'mc'(객관식) | 'ox' | 'explain'(서술형, 스스로 채점)
//   prompt   : 문제
//   explain  : 해설 (정답 공개 후 표시)
//
// type 별 추가 필드
//   mc      : choices(배열), answer(정답 인덱스, 0부터)
//   ox      : answer(true = O, false = X)
//   explain : keypoints(모범 답안에 들어가야 할 핵심 요소 배열)
//
// 문자열 안에서 `백틱`으로 감싸면 코드 글꼴로 표시된다.
// =====================================================================

window.CS_TOPICS = [
  {
    key: 'arch', name: '컴퓨터 구조',
    why: 'CPU가 명령어를 어떻게 실행하고, 데이터가 메모리 계층을 어떻게 오가는지. 성능 문제의 대부분이 여기서 설명된다.',
    concepts: {
      core: ['메모리 계층 구조', '캐시와 지역성', '포인터/워드 크기'],
      good: ['프로그램 카운터와 함수 호출', '암달의 법칙'],
      later: ['파이프라이닝', '캐시 일관성(멀티코어)']
    }
  },
  {
    key: 'os', name: '운영체제',
    why: '프로세스, 스레드, 동기화, 가상 메모리. 동시에 도는 코드와 메모리 버그를 이해하는 기반.',
    concepts: {
      core: ['프로그램 vs 프로세스', '프로세스 vs 스레드', '문맥 전환', '시스템 콜', '경쟁 상태와 락', '데드락', '가상 메모리'],
      good: ['페이지 폴트', '세마포어 vs 락', '우선순위 역전'],
      later: ['스케줄링 알고리즘 상세(MLFQ 등)', '페이지 교체 알고리즘']
    }
  },
  {
    key: 'mem', name: '메모리와 C',
    why: '스택과 힙, 포인터, 동적 할당. 언어가 숨겨주는 메모리를 직접 보는 눈.',
    concepts: {
      core: ['스택 vs 힙', '포인터 연산', '값에 의한 전달과 이중 포인터', '문자열과 널 문자', '댕글링 포인터'],
      good: ['단편화', '스택이 자라는 방향'],
      later: ['메모리 정렬(alignment) 상세', '가비지 컬렉션 방식']
    }
  },
  {
    key: 'ds', name: '자료구조',
    why: '어떤 연산이 빠르고 느린지를 결정하는 데이터 배치 방식.',
    concepts: {
      core: ['배열 vs 연결 리스트', '스택과 큐', '해시 테이블', '이진 탐색 트리'],
      good: ['힙과 우선순위 큐', '그래프 표현'],
      later: ['균형 트리(레드블랙/AVL) 구현', '트라이']
    }
  },
  {
    key: 'algo', name: '알고리즘',
    why: '시간복잡도로 코드가 감당할 수 있는 입력 크기를 미리 판단하는 능력.',
    concepts: {
      core: ['Big-O 판단', '이분 탐색', 'BFS/DFS', '재귀와 DP'],
      good: ['정렬 알고리즘 특성', '그리디의 한계'],
      later: ['최단 경로(다익스트라 등) 상세', '분할 상환 분석']
    }
  },
  {
    key: 'net', name: '네트워크',
    why: '요청 하나가 브라우저에서 서버까지 가는 길. 백엔드 디버깅의 지도.',
    concepts: {
      core: ['TCP vs UDP', '3-way handshake', 'IP와 포트', 'DNS', 'URL 입력 후 흐름'],
      good: ['HTTP 상태 코드', 'HTTP의 무상태성', '소켓'],
      later: ['TCP 혼잡 제어', 'TLS 핸드셰이크 상세']
    }
  },
  {
    key: 'db', name: '데이터베이스',
    why: '데이터를 안전하게 저장하고 빠르게 찾는 법. 서비스 성능 병목의 단골.',
    concepts: {
      core: ['인덱스', '트랜잭션과 ACID', 'JOIN'],
      good: ['N+1 문제', '정규화'],
      later: ['격리 수준과 이상 현상', '복제와 샤딩']
    }
  },
  {
    key: 'web', name: '웹과 백엔드',
    why: '인증, HTTP 메서드, 보안. 실제 서비스를 만들 때 매일 마주치는 것들.',
    concepts: {
      core: ['쿠키/세션/JWT', 'HttpOnly 쿠키', 'HTTP 메서드와 REST'],
      good: ['SQL 인젝션', 'CORS'],
      later: ['HTTP 캐싱 헤더', 'OAuth 흐름']
    }
  }
];

window.CS_QUESTIONS = [
  // ───────────────────────── 컴퓨터 구조 ─────────────────────────
  {
    id: 'arch-01', topic: 'arch', concept: '메모리 계층 구조', tier: 'core', level: 1, type: 'mc',
    prompt: '다음 중 CPU가 접근하는 속도가 가장 빠른 것은?',
    choices: ['메인 메모리(DRAM)', 'L1 캐시', 'CPU 레지스터', 'SSD'],
    answer: 2,
    explain: '레지스터는 CPU 안에 있어서 보통 1사이클 안에 접근된다. 속도 순서는 레지스터 > L1 > L2/L3 캐시(SRAM) > 메인 메모리(DRAM) > SSD/HDD. 위로 갈수록 빠르지만 작고 비싸다.'
  },
  {
    id: 'arch-02', topic: 'arch', concept: '메모리 계층 구조', tier: 'core', level: 2, type: 'ox',
    prompt: '캐시는 메인 메모리보다 용량이 크고, 느리지만, 값이 싸다.',
    answer: false,
    explain: '반대다. 캐시(SRAM)는 메인 메모리(DRAM)보다 작고, 빠르고, 비싸다. 그래서 전부를 캐시로 만들 수 없고, 자주 쓰는 데이터만 골라 위 계층에 둔다. 이게 계층 구조가 존재하는 이유.'
  },
  {
    id: 'arch-03', topic: 'arch', concept: '캐시와 지역성', tier: 'core', level: 3, type: 'explain',
    prompt: 'C에서 2차원 배열 `a[1000][1000]`을 행 순서(`a[i][j]`, j가 안쪽 루프)로 도는 코드가 열 순서(i가 안쪽 루프)로 도는 코드보다 빠르다. 왜 그럴까?',
    keypoints: [
      'C 배열은 행 우선(row-major)으로 메모리에 연속 저장된다',
      '행 순서로 돌면 바로 옆 주소를 차례로 읽는다 (공간 지역성)',
      '캐시는 바이트 하나가 아니라 캐시 라인(블록) 단위로 가져온다',
      '열 순서는 매번 1000칸씩 건너뛰어서 캐시 미스가 많이 난다'
    ],
    explain: '`a[0][0]`을 읽으면 캐시는 그 주변(예: 64바이트 = int 16개)을 한 번에 가져온다. 행 순서면 다음 15번의 접근이 이미 캐시에 있어서 히트. 열 순서면 다음 접근 `a[1][0]`이 4000바이트 떨어져 있어서 매번 새 라인을 메인 메모리에서 가져와야 한다. 연산 횟수는 같아도 메모리 대기 시간이 다르다.'
  },
  {
    id: 'arch-04', topic: 'arch', concept: '캐시와 지역성', tier: 'core', level: 1, type: 'mc',
    prompt: '다음 중 "시간적 지역성"의 예로 가장 알맞은 것은?',
    choices: ['배열을 0번부터 순서대로 읽는다', '반복문 안에서 변수 `sum`을 계속 읽고 쓴다', '파일을 처음부터 끝까지 읽는다', '서로 다른 함수들을 한 번씩 호출한다'],
    answer: 1,
    explain: '시간적 지역성 = 최근에 쓴 데이터를 곧 다시 쓴다. `sum`은 같은 주소를 반복해서 접근한다. 배열이나 파일을 순서대로 읽는 건 "옆 주소를 쓴다"는 공간적 지역성이다.'
  },
  {
    id: 'arch-05', topic: 'arch', concept: '암달의 법칙', tier: 'good', level: 2, type: 'mc',
    prompt: '전체 실행 시간의 20%를 차지하는 부분을 10배 빠르게 만들었다. 전체 프로그램은 약 몇 배 빨라질까?',
    choices: ['약 10배', '약 2배', '약 1.22배', '약 1.8배'],
    answer: 2,
    explain: '공식: 1 / ((1−α) + α/k), α = 0.2, k = 10.\n1) 안 바뀐 부분: 1 − 0.2 = 0.8\n2) 바뀐 부분: 0.2 / 10 = 0.02\n3) 새 실행 시간 비율: 0.8 + 0.02 = 0.82\n4) 속도 향상: 1 / 0.82 ≈ 1.22배\n큰 향상을 원하면 비중이 큰 부분을 개선해야 한다.'
  },
  {
    id: 'arch-06', topic: 'arch', concept: '프로그램 카운터와 함수 호출', tier: 'good', level: 3, type: 'explain',
    prompt: '프로그램 카운터(PC)는 무엇을 담고 있고, 함수를 호출(`call`)하고 돌아올(`ret`) 때 PC는 어떻게 바뀌는가?',
    keypoints: [
      'PC는 다음에 실행할 명령어의 주소를 담는다',
      '`call`은 복귀 주소(call 다음 명령어 주소)를 스택에 push한다',
      '`call`은 PC를 함수 시작 주소로 바꾼다',
      '`ret`은 스택에서 복귀 주소를 pop해서 PC에 넣는다'
    ],
    explain: 'CPU는 "PC가 가리키는 명령어 실행 → PC 갱신"을 계속 반복할 뿐이다. 함수 호출이 가능한 이유는 돌아올 주소를 스택에 적어두기 때문. 버퍼 오버플로 공격이 이 복귀 주소를 덮어쓰는 방식이라는 것도 같이 기억하면 좋다.'
  },
  {
    id: 'arch-07', topic: 'arch', concept: '포인터/워드 크기', tier: 'core', level: 2, type: 'ox',
    prompt: 'x86-64(64비트) 시스템에서 포인터의 크기는 8바이트다.',
    answer: true,
    explain: '포인터는 주소를 담고, 64비트 시스템의 주소는 64비트 = 8바이트다. 그래서 `int *`든 `char *`든 구조체 포인터든 `sizeof`는 모두 8. 32비트 시스템에서는 4바이트.'
  },

  // ───────────────────────── 운영체제 ─────────────────────────
  {
    id: 'os-01', topic: 'os', concept: '프로그램 vs 프로세스', tier: 'core', level: 3, type: 'explain',
    prompt: '프로그램과 프로세스는 어떻게 다른가? "실행 중인 프로그램"이라는 말 말고, 실행되면 무엇이 생기는지까지 설명해보자.',
    keypoints: [
      '프로그램은 디스크에 저장된 실행 파일(코드와 데이터)일 뿐이다',
      '프로세스는 메모리에 올라와 실행 중인 인스턴스다',
      '프로세스는 자기만의 주소 공간(코드/데이터/힙/스택)을 가진다',
      'PC, 레지스터 같은 실행 상태와 열린 파일 등 OS 자원을 가진다',
      '같은 프로그램으로 여러 프로세스를 동시에 만들 수 있다'
    ],
    explain: '프로그램은 레시피, 프로세스는 그 레시피로 지금 요리하고 있는 주방 하나에 비유할 수 있다. 실제 개념으로는, OS가 실행 파일을 메모리에 올리고 주소 공간, 레지스터 상태, 파일 디스크립터 테이블 같은 것을 붙여서 "실행 단위"로 관리하는 것이 프로세스다. 터미널을 두 개 열면 같은 쉘 프로그램으로 프로세스가 두 개 생긴다.'
  },
  {
    id: 'os-02', topic: 'os', concept: '프로세스 vs 스레드', tier: 'core', level: 2, type: 'mc',
    prompt: '같은 프로세스 안의 스레드들이 서로 공유하지 않는 것은?',
    choices: ['힙 영역', '전역 변수', '코드 영역', '스택'],
    answer: 3,
    explain: '스레드는 실행 흐름이라 각자 자기 스택(지역 변수, 함수 호출 기록)과 레지스터(PC 포함)를 가진다. 코드, 전역 변수, 힙은 같은 주소 공간 안에 있어서 공유한다. 그래서 전역 변수나 힙 데이터를 여러 스레드가 동시에 건드리면 동기화가 필요하다.'
  },
  {
    id: 'os-03', topic: 'os', concept: '문맥 전환', tier: 'core', level: 3, type: 'explain',
    prompt: '문맥 전환(context switch)을 할 때 왜 현재 스레드의 레지스터 값을 저장해야 할까? 저장하지 않으면 구체적으로 무슨 일이 생길까?',
    keypoints: [
      'CPU의 레지스터는 한 벌뿐이라 다음 스레드가 실행되며 덮어쓴다',
      '레지스터에는 PC(어디까지 실행했는지), 스택 포인터, 계산 중인 값이 들어있다',
      '저장하지 않으면 다시 돌아왔을 때 이어서 실행할 수 없다',
      '전환 = 현재 상태 저장 + 다음 스레드 상태 복원'
    ],
    explain: '예: 스레드 A가 `rax`에 계산 중간값 42를 넣고 다음 줄을 실행하려는 순간 타이머 인터럽트가 왔다. B가 실행되며 `rax`를 7로 덮어쓴다. A로 돌아왔을 때 A의 상태를 복원하지 않으면 A는 42 대신 7로 계산을 이어가고, PC도 B가 실행하던 위치를 가리킨다. 핀토스의 스레드 전환 코드가 레지스터를 저장/복원하는 이유가 바로 이것.'
  },
  {
    id: 'os-04', topic: 'os', concept: '시스템 콜', tier: 'core', level: 2, type: 'ox',
    prompt: '유저 프로그램이 `printf`로 화면에 출력할 때, 유저 프로그램이 디스플레이 하드웨어를 직접 제어한다.',
    answer: false,
    explain: '유저 모드 코드는 하드웨어에 직접 접근할 수 없다. `printf`는 내부에서 `write` 시스템 콜을 호출하고, 트랩으로 커널 모드에 들어가 커널이 대신 장치를 다룬다. 핀토스 Project 2의 `syscall_handler`가 이 지점을 구현하는 것.'
  },
  {
    id: 'os-05', topic: 'os', concept: '경쟁 상태와 락', tier: 'core', level: 3, type: 'explain',
    prompt: '두 스레드가 전역 변수 `count`(처음 값 0)에 각각 `count++`를 한 번씩 실행했는데 결과가 1이 나올 수 있다. 어떻게 이런 일이 생기고, 어떻게 막을까?',
    keypoints: [
      '`count++`는 한 동작이 아니라 읽기(load) → 더하기(add) → 쓰기(store) 세 단계다',
      '중간에 문맥 전환이 일어나면 두 스레드가 둘 다 0을 읽을 수 있다',
      '둘 다 1을 저장하므로 갱신 하나가 사라진다 (경쟁 상태)',
      '임계 구역을 락(또는 세마포어)으로 감싸 한 번에 한 스레드만 실행하게 한다'
    ],
    explain: '실행 순서 예:\nA: load count → 0\nB: load count → 0\nA: add → 1, store → count=1\nB: add → 1, store → count=1\n결과 1. 결과가 실행 순서(타이밍)에 따라 달라지는 상황을 경쟁 상태라고 한다. `lock_acquire` / `lock_release`로 세 단계를 묶으면 끼어들 수 없다.'
  },
  {
    id: 'os-06', topic: 'os', concept: '데드락', tier: 'core', level: 2, type: 'mc',
    prompt: '데드락이 발생하기 위한 네 가지 필요 조건에 해당하지 않는 것은?',
    choices: ['상호 배제', '순환 대기', '비선점', '기아 상태(starvation)'],
    answer: 3,
    explain: '네 조건은 상호 배제, 점유 대기(hold and wait), 비선점, 순환 대기. 넷 중 하나라도 깨면 데드락은 생기지 않는다. 기아 상태는 "계속 차례가 안 오는 것"이라 다른 문제다. 데드락은 모두가 서로를 기다리며 멈춘 상태.'
  },
  {
    id: 'os-07', topic: 'os', concept: '가상 메모리', tier: 'core', level: 3, type: 'explain',
    prompt: '가상 메모리는 왜 필요할까? 이유를 두 가지 이상 들고, 가상 주소가 실제 메모리 위치로 바뀌는 과정을 한 줄로 설명해보자.',
    keypoints: [
      '보호/격리: 프로세스가 다른 프로세스의 메모리를 건드릴 수 없다',
      '모든 프로세스가 같은 모양의 주소 공간을 가져 링킹/로딩이 단순해진다',
      '물리 메모리보다 큰 공간을 쓸 수 있다 (안 쓰는 페이지는 디스크로)',
      'MMU가 페이지 테이블을 보고 가상 주소를 물리 주소로 변환한다'
    ],
    explain: '각 프로세스는 "메모리를 혼자 쓴다"고 착각한다. 실제로는 페이지 단위로 쪼개진 가상 주소를 페이지 테이블이 물리 프레임에 매핑한다. 같은 가상 주소 0x400000이라도 프로세스마다 다른 물리 위치를 가리킬 수 있다. 핀토스 VM 프로젝트가 이 매핑과 페이지 폴트 처리를 직접 만드는 과정.'
  },
  {
    id: 'os-08', topic: 'os', concept: '페이지 폴트', tier: 'good', level: 2, type: 'mc',
    prompt: '페이지 폴트는 언제 발생하는가?',
    choices: ['CPU 캐시에 데이터가 없을 때', '접근한 가상 페이지가 현재 물리 메모리에 매핑되어 있지 않을 때', '0으로 나누었을 때', '스택이 가득 찼을 때 항상'],
    answer: 1,
    explain: '페이지 테이블에 유효한 매핑이 없으면 MMU가 예외를 일으키고 커널의 페이지 폴트 핸들러가 실행된다. 핸들러는 디스크에서 페이지를 읽어오거나(지연 로딩, 스왑), 잘못된 접근이면 프로세스를 종료한다. 캐시 미스는 하드웨어가 알아서 처리하는 것이라 다른 개념.'
  },
  {
    id: 'os-09', topic: 'os', concept: '세마포어 vs 락', tier: 'good', level: 2, type: 'ox',
    prompt: '락(lock)은 획득한 스레드만 해제할 수 있지만, 세마포어는 다른 스레드가 up(V)을 해도 된다.',
    answer: true,
    explain: '락에는 "주인(holder)" 개념이 있어서 잡은 스레드가 풀어야 한다. 세마포어는 그냥 카운터라 주인이 없다. 그래서 세마포어는 "A가 끝나면 B에게 알려준다" 같은 신호 용도로도 쓸 수 있다. 핀토스의 `struct lock`에 `holder` 필드가 있는 것이 이 차이.'
  },
  {
    id: 'os-10', topic: 'os', concept: '우선순위 역전', tier: 'good', level: 2, type: 'mc',
    prompt: '우선순위가 낮은 스레드 L이 락을 잡고 있어서 높은 스레드 H가 기다리는데, 중간 우선순위 M이 계속 CPU를 차지한다. 이 문제의 대표적인 해결책은?',
    choices: ['H의 우선순위를 낮춘다', 'L에게 H의 우선순위를 잠시 빌려준다(priority donation)', 'M을 종료시킨다', '락을 세마포어로 바꾼다'],
    answer: 1,
    explain: 'L이 H의 우선순위를 기부받으면 M보다 먼저 실행되어 빨리 락을 풀고, H가 진행할 수 있다. 락을 풀면 L은 원래 우선순위로 돌아간다. 핀토스 Project 1의 priority donation 과제가 이것.'
  },

  // ───────────────────────── 메모리와 C ─────────────────────────
  {
    id: 'mem-01', topic: 'mem', concept: '스택 vs 힙', tier: 'core', level: 1, type: 'mc',
    prompt: '`malloc`으로 할당한 메모리는 어느 영역에 있는가?',
    choices: ['스택', '힙', '코드 영역', '레지스터'],
    answer: 1,
    explain: '힙은 프로그램이 실행 중에 크기를 정해서 요청하고, 직접 `free`할 때까지 살아있는 영역이다. 스택은 함수가 호출될 때 자동으로 생기고 함수가 끝나면 자동으로 사라진다.'
  },
  {
    id: 'mem-02', topic: 'mem', concept: '댕글링 포인터', tier: 'core', level: 2, type: 'mc',
    prompt: '함수 안에서 `int x = 5; return &x;` 처럼 지역 변수의 주소를 반환하면 어떻게 될까?',
    choices: ['호출자가 안전하게 5를 읽을 수 있다', '컴파일러가 자동으로 x를 힙으로 옮긴다', '함수가 끝나며 스택 프레임이 사라져 댕글링 포인터가 된다', '항상 세그폴트가 즉시 난다'],
    answer: 2,
    explain: 'x는 스택 프레임 안에 있고, 함수가 반환되면 그 공간은 다음 함수 호출이 재사용한다. 주소는 남아있지만 내용은 언제든 덮어쓰일 수 있다(정의되지 않은 동작). 바로 터지지 않을 수도 있어서 더 위험하다. 값을 오래 살리려면 `malloc`을 쓰거나 호출자가 공간을 넘겨줘야 한다.'
  },
  {
    id: 'mem-03', topic: 'mem', concept: '값에 의한 전달과 이중 포인터', tier: 'core', level: 3, type: 'explain',
    prompt: '연결 리스트의 맨 앞에 노드를 넣는 함수가 호출자의 `head` 변수 자체를 바꿔야 한다. 왜 `ListNode *head`가 아니라 `ListNode **head`를 받아야 할까?',
    keypoints: [
      'C는 모든 인자를 값으로 복사해서 전달한다',
      '`ListNode *head`로 받으면 포인터 값의 복사본을 받는다',
      '복사본을 바꿔도 호출자의 원래 head는 그대로다',
      'head 변수의 주소(`&head`)를 받아 `*head = 새노드`로 원본을 바꾼다'
    ],
    explain: '숫자로 보면: 호출자의 head가 주소 0x100에 있고 값은 0x500(첫 노드)이다. `ListNode *h`로 받으면 h에 0x500이 복사되고, `h = 0x900`은 h만 바뀐다. `ListNode **h`로 받으면 h에는 0x100이 들어오고, `*h = 0x900`은 주소 0x100에 있는 진짜 head를 바꾼다.'
  },
  {
    id: 'mem-04', topic: 'mem', concept: '문자열과 널 문자', tier: 'core', level: 1, type: 'ox',
    prompt: '`char s[] = "hi";` 일 때 `sizeof(s)`는 2다.',
    answer: false,
    explain: '3이다. 문자열 리터럴 끝에는 널 종료 문자(`\\0`)가 자동으로 붙어서 h, i, \\0 세 칸이 된다. `strlen(s)`는 널 문자 전까지 세므로 2. sizeof와 strlen이 다른 값을 내는 대표적인 예.'
  },
  {
    id: 'mem-05', topic: 'mem', concept: '포인터 연산', tier: 'core', level: 2, type: 'mc',
    prompt: '`int arr[5]; int *p = arr;` 이고 p가 주소 1000을 가리킨다. `p + 1`은 몇 번지를 가리킬까? (int는 4바이트)',
    choices: ['1001', '1004', '1008', '1005'],
    answer: 1,
    explain: '포인터에 1을 더하면 "1바이트 뒤"가 아니라 "가리키는 자료형 하나만큼 뒤"로 간다. int는 4바이트이므로 1000 + 1×4 = 1004. 그래서 `*(p + i)`와 `arr[i]`가 같은 의미가 된다.'
  },
  {
    id: 'mem-06', topic: 'mem', concept: '단편화', tier: 'good', level: 3, type: 'explain',
    prompt: '메모리 할당기에서 내부 단편화와 외부 단편화는 각각 무엇인가? 예시를 하나씩 들어보자.',
    keypoints: [
      '내부 단편화: 할당된 블록 안에 실제로 안 쓰이는 공간',
      '정렬이나 최소 블록 크기, 헤더 때문에 요청보다 크게 주면 생긴다',
      '외부 단편화: 빈 공간의 합은 충분한데 연속된 큰 블록이 없는 상태',
      '외부 단편화는 연결(coalescing)이나 배치 정책으로 줄인다'
    ],
    explain: '내부: 5바이트를 요청했는데 8바이트 정렬 때문에 8바이트 블록을 주면 3바이트가 낭비. 외부: 빈 블록이 16, 16, 16바이트로 흩어져 있으면 총 48바이트가 비어 있어도 32바이트 요청을 처리할 수 없다. malloc lab에서 coalesce를 구현하는 이유가 외부 단편화.'
  },
  {
    id: 'mem-07', topic: 'mem', concept: '댕글링 포인터', tier: 'good', level: 2, type: 'ox',
    prompt: '`free(p)`를 호출하면 p는 자동으로 NULL이 된다.',
    answer: false,
    explain: '`free`는 p가 가리키던 메모리를 할당기에 돌려줄 뿐, 변수 p 안의 주소값은 그대로 남는다(값에 의한 전달이라 free가 p를 바꿀 수도 없다). 그래서 `free(p); p = NULL;`을 습관으로 쓰면 이후 실수로 역참조할 때 바로 드러난다.'
  },
  {
    id: 'mem-08', topic: 'mem', concept: '스택이 자라는 방향', tier: 'good', level: 2, type: 'mc',
    prompt: 'x86-64에서 함수 호출이 깊어질수록 스택은 어느 방향으로 자라는가?',
    choices: ['높은 주소 방향', '낮은 주소 방향', '방향이 정해져 있지 않다', '힙 쪽으로 자라지 않는다'],
    answer: 1,
    explain: '스택은 높은 주소에서 시작해 낮은 주소 방향으로 자란다. `push`는 `rsp`를 8 줄이고 값을 쓴다. 힙은 반대로 낮은 쪽에서 위로 자라서 둘이 가운데 빈 공간을 나눠 쓰는 구조.'
  },

  // ───────────────────────── 자료구조 ─────────────────────────
  {
    id: 'ds-01', topic: 'ds', concept: '배열 vs 연결 리스트', tier: 'core', level: 1, type: 'mc',
    prompt: 'i번째 원소에 접근하는 시간복잡도로 올바른 것은?',
    choices: ['배열 O(1), 연결 리스트 O(1)', '배열 O(n), 연결 리스트 O(1)', '배열 O(1), 연결 리스트 O(n)', '둘 다 O(log n)'],
    answer: 2,
    explain: '배열은 원소가 연속으로 있어서 "시작 주소 + i × 원소 크기"로 바로 계산한다. 연결 리스트는 head부터 next를 i번 따라가야 한다. 대신 연결 리스트는 위치를 알고 있으면 중간 삽입/삭제가 O(1).'
  },
  {
    id: 'ds-02', topic: 'ds', concept: '스택과 큐', tier: 'core', level: 1, type: 'mc',
    prompt: 'BFS(너비 우선 탐색)에 쓰는 자료구조는?',
    choices: ['스택', '큐', '해시 테이블', '힙'],
    answer: 1,
    explain: 'BFS는 먼저 발견한 노드를 먼저 방문해야 가까운 것부터 퍼져나간다. 먼저 들어간 것이 먼저 나오는(FIFO) 큐가 맞다. DFS는 가장 최근에 발견한 것을 먼저 파고드니 스택(또는 재귀).'
  },
  {
    id: 'ds-03', topic: 'ds', concept: '해시 테이블', tier: 'core', level: 3, type: 'explain',
    prompt: '해시 테이블의 조회가 평균 O(1)인 이유는 무엇이고, 최악의 경우 O(n)이 되는 건 어떤 상황일까?',
    keypoints: [
      '해시 함수로 키를 배열 인덱스로 바꿔 해당 버킷에 바로 간다',
      '서로 다른 키가 같은 인덱스로 가는 충돌이 생길 수 있다',
      '충돌은 체이닝(리스트로 연결)이나 개방 주소법으로 처리한다',
      '모든 키가 한 버킷에 몰리면 그 리스트를 다 훑어야 해서 O(n)'
    ],
    explain: 'Python의 dict가 해시 테이블이다. 원소가 많아져 버킷 대비 원소 비율(load factor)이 커지면 충돌이 늘어나므로, 보통 배열을 키우고 다시 배치(rehash)해서 평균 O(1)을 유지한다.'
  },
  {
    id: 'ds-04', topic: 'ds', concept: '이진 탐색 트리', tier: 'core', level: 2, type: 'ox',
    prompt: '이진 탐색 트리(BST)에서 탐색은 항상 O(log n)이다.',
    answer: false,
    explain: '1, 2, 3, 4, 5를 순서대로 넣으면 오른쪽으로만 이어진 막대 모양이 되어 사실상 연결 리스트다. 이때 탐색은 O(n). 높이가 log n으로 유지될 때만 O(log n)이고, 그걸 보장하는 게 AVL, 레드블랙 같은 균형 트리.'
  },
  {
    id: 'ds-05', topic: 'ds', concept: '이진 탐색 트리', tier: 'core', level: 2, type: 'mc',
    prompt: 'BST를 중위 순회(왼쪽 → 현재 → 오른쪽)하면 값이 어떤 순서로 나올까?',
    choices: ['넣은 순서대로', '오름차순', '내림차순', '레벨 순서'],
    answer: 1,
    explain: 'BST는 "왼쪽 < 현재 < 오른쪽"이 모든 노드에서 성립한다. 왼쪽을 다 보고, 자신을 보고, 오른쪽을 보면 작은 것부터 나온다. 예: 루트 5, 왼쪽 3, 오른쪽 8 → 3, 5, 8.'
  },
  {
    id: 'ds-06', topic: 'ds', concept: '힙과 우선순위 큐', tier: 'good', level: 2, type: 'mc',
    prompt: '최소 힙(min-heap)에서 최솟값을 꺼내는(삭제하는) 연산의 시간복잡도는?',
    choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    answer: 1,
    explain: '최솟값은 루트에 있어서 확인만은 O(1). 하지만 꺼내면 마지막 원소를 루트로 올리고 자식과 비교하며 내려보내야(heapify) 한다. 트리 높이만큼 내려가니 O(log n).'
  },
  {
    id: 'ds-07', topic: 'ds', concept: '힙과 우선순위 큐', tier: 'good', level: 3, type: 'explain',
    prompt: '우선순위 큐를 "정렬된 연결 리스트"로 만들 때와 "힙"으로 만들 때, 삽입과 꺼내기 비용을 비교해보자. 어떤 상황에서 정렬 리스트도 괜찮을까?',
    keypoints: [
      '정렬 리스트: 삽입 O(n)(자리 찾기), 최고 우선순위 꺼내기 O(1)',
      '힙: 삽입 O(log n), 꺼내기 O(log n)',
      '원소가 많고 삽입이 잦으면 힙이 유리하다',
      '원소 수가 적으면 단순한 정렬 리스트도 충분하다'
    ],
    explain: '핀토스의 ready list는 정렬 삽입(`list_insert_ordered`)으로 우선순위 큐를 만든다. 스레드 수가 적어서 O(n) 삽입도 문제가 없고 구현이 단순하기 때문. 자료구조 선택은 "이론상 더 빠른 것"이 아니라 데이터 크기와 연산 빈도를 보고 정한다.'
  },
  {
    id: 'ds-08', topic: 'ds', concept: '그래프 표현', tier: 'good', level: 2, type: 'ox',
    prompt: '정점이 V개인 그래프를 인접 행렬로 저장하면 공간이 O(V²)이 필요하다.',
    answer: true,
    explain: 'V × V 표를 만들기 때문. 정점 10,000개면 1억 칸이다. 간선이 적은 그래프(희소 그래프)는 인접 리스트(O(V + E))가 훨씬 효율적이다.'
  },

  // ───────────────────────── 알고리즘 ─────────────────────────
  {
    id: 'algo-01', topic: 'algo', concept: '이분 탐색', tier: 'core', level: 1, type: 'mc',
    prompt: '이분 탐색을 쓰기 위해 반드시 필요한 조건은?',
    choices: ['데이터가 정렬되어 있어야 한다', '데이터에 중복이 없어야 한다', '데이터가 연결 리스트여야 한다', '데이터 개수가 2의 거듭제곱이어야 한다'],
    answer: 0,
    explain: '가운데 값과 비교해서 "찾는 값은 왼쪽 절반에 있다"고 판단하려면 정렬되어 있어야 한다. 매번 절반을 버리니 O(log n). n = 1,000,000이면 약 20번 비교로 끝난다.'
  },
  {
    id: 'algo-02', topic: 'algo', concept: 'Big-O 판단', tier: 'core', level: 2, type: 'mc',
    prompt: '1초에 약 1억(10⁸) 번 연산할 수 있다고 하자. n = 1,000,000일 때 1초 안에 끝날 수 있는 시간복잡도는?',
    choices: ['O(n²)', 'O(n log n)', 'O(n³)', 'O(2ⁿ)'],
    answer: 1,
    explain: 'n log n ≈ 10⁶ × 20 = 2×10⁷ → 1억 이하라 가능.\nn² = 10¹² → 1억의 1만 배, 약 2.8시간.\n입력 크기를 보고 허용되는 복잡도를 먼저 정하면 접근법 후보가 줄어든다.'
  },
  {
    id: 'algo-03', topic: 'algo', concept: '재귀와 DP', tier: 'core', level: 3, type: 'explain',
    prompt: '`fib(n) = fib(n-1) + fib(n-2)`를 그대로 재귀로 짜면 n이 40만 돼도 느리다. 왜 느리고, DP(메모이제이션)는 이걸 어떻게 해결할까?',
    keypoints: [
      '같은 부분 문제를 여러 번 반복 계산한다 (예: fib(5) 안에서 fib(3)이 두 번)',
      '호출 수가 n에 대해 지수적으로 늘어난다',
      '메모이제이션은 한 번 계산한 결과를 저장해두고 재사용한다',
      '각 fib(k)를 한 번씩만 계산하므로 O(n)이 된다'
    ],
    explain: 'fib(5) → fib(4) + fib(3), fib(4) → fib(3) + fib(2). fib(3)이 벌써 두 번. 아래로 갈수록 중복이 폭발한다. 배열 memo[k]에 결과를 적어두면 두 번째부터는 표에서 바로 꺼낸다. DP의 조건은 "겹치는 부분 문제"와 "부분 문제의 답으로 전체 답을 만들 수 있음".'
  },
  {
    id: 'algo-04', topic: 'algo', concept: 'BFS/DFS', tier: 'core', level: 2, type: 'mc',
    prompt: 'DFS를 재귀 없이 반복문으로 구현할 때 필요한 자료구조는?',
    choices: ['큐', '스택', '힙', '해시 테이블'],
    answer: 1,
    explain: '재귀 호출은 사실 콜 스택을 쓰는 것이다. 그 스택을 직접 만들어 "가장 최근에 넣은 노드부터 꺼내기"를 하면 같은 순서로 깊이 우선 탐색이 된다.'
  },
  {
    id: 'algo-05', topic: 'algo', concept: 'BFS/DFS', tier: 'core', level: 2, type: 'ox',
    prompt: 'BFS는 가중치가 없는 그래프에서 시작점부터 각 정점까지의 최단 거리를 구할 수 있다.',
    answer: true,
    explain: 'BFS는 거리 1인 정점을 모두 방문한 다음 거리 2, 그다음 3 순서로 퍼진다. 그래서 처음 도달한 순간이 최단 거리. 간선마다 가중치가 다르면 다익스트라 같은 알고리즘이 필요하다.'
  },
  {
    id: 'algo-06', topic: 'algo', concept: '정렬 알고리즘 특성', tier: 'good', level: 2, type: 'mc',
    prompt: '항상 첫 번째 원소를 피벗으로 쓰는 퀵 정렬이 O(n²)이 되는 대표적인 입력은?',
    choices: ['무작위로 섞인 배열', '이미 정렬된 배열', '모든 값이 서로 다른 배열', '길이가 홀수인 배열'],
    answer: 1,
    explain: '이미 정렬되어 있으면 피벗(가장 작은 값)이 매번 한쪽에 0개, 다른 쪽에 n−1개로 나눈다. 분할이 n번 일어나고 매번 O(n) 비교라 O(n²). 그래서 실제 구현은 무작위 피벗이나 세 값의 중앙값을 쓴다.'
  },
  {
    id: 'algo-07', topic: 'algo', concept: '그리디의 한계', tier: 'good', level: 3, type: 'explain',
    prompt: '동전 종류가 1원, 3원, 4원일 때 6원을 가장 적은 동전으로 만들어보자. "큰 동전부터 고르는" 그리디는 정답을 낼까?',
    keypoints: [
      '그리디: 4 + 1 + 1 = 동전 3개',
      '최적: 3 + 3 = 동전 2개',
      '그리디는 매 순간 최선이 전체 최선이라는 보장이 있을 때만 맞다',
      '보장이 없으면 DP로 모든 경우를 따져야 한다'
    ],
    explain: '한국 동전(10, 50, 100, 500)은 큰 단위가 작은 단위의 배수라서 그리디가 맞는다. 단위가 바뀌면 깨진다. 그리디를 쓰기 전에 "왜 이 선택이 항상 안전한가"를 설명할 수 있어야 한다.'
  },
  {
    id: 'algo-08', topic: 'algo', concept: 'Big-O 판단', tier: 'good', level: 2, type: 'mc',
    prompt: '다음 코드의 시간복잡도는?\n`for i in range(n):`\n`    for j in range(i, n):`\n`        cnt += 1`',
    choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
    answer: 2,
    explain: 'n = 4로 세어보면 i=0: 4번, i=1: 3번, i=2: 2번, i=3: 1번 → 합 10 = 4×5/2.\n일반식 n(n+1)/2 ≈ n²/2. 상수 1/2는 버리므로 O(n²). 안쪽 루프가 줄어들어도 차수는 그대로다.'
  },

  // ───────────────────────── 네트워크 ─────────────────────────
  {
    id: 'net-01', topic: 'net', concept: 'TCP vs UDP', tier: 'core', level: 1, type: 'mc',
    prompt: '데이터가 빠짐없이, 보낸 순서대로 도착하도록 보장하는 전송 계층 프로토콜은?',
    choices: ['UDP', 'TCP', 'IP', 'DNS'],
    answer: 1,
    explain: 'TCP는 연결을 맺고, 순서 번호와 확인 응답(ACK), 재전송으로 신뢰성을 보장한다. UDP는 그런 장치 없이 바로 보내서 빠르고 가볍다. 실시간 게임이나 영상 통화처럼 조금 잃어도 빠른 게 중요하면 UDP.'
  },
  {
    id: 'net-02', topic: 'net', concept: '3-way handshake', tier: 'core', level: 3, type: 'explain',
    prompt: 'TCP 3-way handshake의 세 단계를 말하고, 왜 2번이 아니라 3번 주고받아야 하는지 설명해보자.',
    keypoints: [
      '클라이언트 → SYN, 서버 → SYN + ACK, 클라이언트 → ACK',
      '양쪽이 각자의 초기 순서 번호(sequence number)를 교환한다',
      '양쪽 모두 "내가 보낸 것을 상대가 받았다"를 확인해야 한다',
      '2번이면 서버는 자기 SYN이 클라이언트에 도착했는지 모른다'
    ],
    explain: '1) SYN: 클라이언트가 "연결하자, 내 시작 번호는 x".\n2) SYN-ACK: 서버가 "x 잘 받았어, 내 시작 번호는 y".\n3) ACK: 클라이언트가 "y 잘 받았어".\n3단계가 끝나야 양방향 모두 송수신이 확인된다.'
  },
  {
    id: 'net-03', topic: 'net', concept: 'DNS', tier: 'core', level: 2, type: 'mc',
    prompt: 'DNS가 하는 일은?',
    choices: ['도메인 이름을 IP 주소로 바꿔준다', '데이터를 암호화한다', '패킷의 순서를 맞춰준다', '웹 페이지를 렌더링한다'],
    answer: 0,
    explain: '네트워크는 IP 주소로 통신하지만 사람은 이름을 기억한다. 브라우저가 example.com에 접속하려면 먼저 DNS에 물어 IP를 알아낸다. 결과는 여러 곳(브라우저, OS, 리졸버)에 캐시된다.'
  },
  {
    id: 'net-04', topic: 'net', concept: 'IP와 포트', tier: 'core', level: 2, type: 'ox',
    prompt: 'IP 주소는 컴퓨터 안의 특정 프로그램(프로세스)을 식별하고, 포트 번호는 네트워크상의 컴퓨터(호스트)를 식별한다.',
    answer: false,
    explain: '반대다. IP는 어느 컴퓨터인지(건물 주소), 포트는 그 컴퓨터의 어느 프로그램인지(호수)를 정한다. 예: 서버 IP의 443번 포트 = HTTPS 웹 서버. Flask 개발 서버가 5000번 포트를 쓰는 것도 같은 원리.'
  },
  {
    id: 'net-05', topic: 'net', concept: 'URL 입력 후 흐름', tier: 'core', level: 3, type: 'explain',
    prompt: '브라우저 주소창에 https://example.com 을 입력하고 엔터를 누르면 화면이 뜨기까지 무슨 일이 일어나는가? 큰 흐름만 순서대로.',
    keypoints: [
      'DNS 조회로 도메인의 IP 주소를 알아낸다',
      '그 IP의 443 포트로 TCP 연결을 맺는다 (3-way handshake)',
      'HTTPS라서 TLS 핸드셰이크로 암호화 연결을 만든다',
      'HTTP 요청을 보내고 서버가 처리해서 응답을 돌려준다',
      '브라우저가 HTML/CSS/JS를 받아 화면을 그린다(추가 리소스도 요청)'
    ],
    explain: '면접 단골 질문이다. 각 단계가 다른 계층의 개념(DNS = 응용, TCP = 전송, IP = 네트워크)과 연결된다는 걸 함께 말하면 좋다. 세부는 단계마다 더 파고들 수 있다.'
  },
  {
    id: 'net-06', topic: 'net', concept: 'HTTP 상태 코드', tier: 'good', level: 2, type: 'mc',
    prompt: '로그인하지 않은 사용자가 인증이 필요한 API를 호출했다. 가장 알맞은 응답 코드는?',
    choices: ['200 OK', '401 Unauthorized', '404 Not Found', '500 Internal Server Error'],
    answer: 1,
    explain: '401 = 인증 정보가 없거나 유효하지 않음(누구인지 모름). 403 = 누구인지는 알지만 권한이 없음. 4xx는 클라이언트 쪽 문제, 5xx는 서버 쪽 문제라는 큰 구분부터 기억하자.'
  },
  {
    id: 'net-07', topic: 'net', concept: 'HTTP의 무상태성', tier: 'good', level: 2, type: 'ox',
    prompt: 'HTTP는 요청 사이의 상태를 기억하지 않는(stateless) 프로토콜이라, 로그인 상태를 유지하려면 쿠키/세션/토큰 같은 장치가 필요하다.',
    answer: true,
    explain: '서버 입장에서 각 요청은 독립적이다. 두 번째 요청이 첫 번째 요청과 같은 사람인지 알려면 요청마다 식별 정보를 실어 보내야 한다. 그 정보를 담는 방법이 세션 ID 쿠키나 JWT.'
  },
  {
    id: 'net-08', topic: 'net', concept: '소켓', tier: 'good', level: 2, type: 'mc',
    prompt: '소켓(socket)에 대한 설명으로 가장 알맞은 것은?',
    choices: ['랜선을 꽂는 하드웨어 포트', '네트워크 통신의 양 끝점을 OS가 추상화한 것으로, 유닉스에서는 파일 디스크립터로 다룬다', 'HTTP의 다른 이름', '라우터 안에 저장된 경로표'],
    answer: 1,
    explain: '"모든 I/O는 파일"이라는 유닉스 원칙의 연장이다. 소켓을 열면 파일 디스크립터 번호가 나오고, `read`/`write`로 데이터를 주고받는다. CS:APP 1장의 "네트워크도 I/O 장치"와 이어지는 개념.'
  },

  // ───────────────────────── 데이터베이스 ─────────────────────────
  {
    id: 'db-01', topic: 'db', concept: '인덱스', tier: 'core', level: 1, type: 'mc',
    prompt: '데이터베이스에 인덱스를 만드는 주된 이유는?',
    choices: ['저장 공간을 줄이려고', '특정 조건의 조회를 빠르게 하려고', '데이터를 암호화하려고', '중복 데이터를 자동 삭제하려고'],
    answer: 1,
    explain: '인덱스가 없으면 조건에 맞는 행을 찾기 위해 테이블 전체를 훑는다(풀 스캔, O(n)). 인덱스는 정렬된 별도 구조라 책 뒤의 색인처럼 바로 위치를 찾는다.'
  },
  {
    id: 'db-02', topic: 'db', concept: '인덱스', tier: 'core', level: 2, type: 'ox',
    prompt: '인덱스는 많이 만들수록 무조건 좋다.',
    answer: false,
    explain: '인덱스도 저장 공간을 차지하고, INSERT/UPDATE/DELETE 때마다 인덱스도 함께 고쳐야 해서 쓰기가 느려진다. 자주 조회 조건(WHERE, JOIN, ORDER BY)에 쓰이는 컬럼에 골라서 만든다.'
  },
  {
    id: 'db-03', topic: 'db', concept: '트랜잭션과 ACID', tier: 'core', level: 3, type: 'explain',
    prompt: 'A 계좌에서 B 계좌로 1만 원을 이체한다. 이 예시로 ACID 중 원자성(Atomicity)과 격리성(Isolation)을 설명해보자.',
    keypoints: [
      '이체는 "A에서 빼기"와 "B에 더하기" 두 작업이다',
      '원자성: 둘 다 성공하거나 둘 다 취소(롤백)되어야 한다',
      '빼기만 되고 더하기 전에 실패하면 돈이 사라진다',
      '격리성: 이체 중간 상태를 다른 트랜잭션이 보거나 끼어들면 안 된다'
    ],
    explain: '나머지 둘: 일관성(Consistency)은 트랜잭션 전후로 규칙(잔액 ≥ 0 등)이 지켜지는 것, 지속성(Durability)은 커밋된 결과는 장애가 나도 남는 것. 격리성은 운영체제의 락/임계 구역과 같은 문제를 DB 수준에서 푸는 것이다.'
  },
  {
    id: 'db-04', topic: 'db', concept: '인덱스', tier: 'core', level: 2, type: 'mc',
    prompt: 'MySQL(InnoDB) 같은 대부분의 관계형 DB에서 기본 인덱스 자료구조는?',
    choices: ['해시 테이블', 'B+ 트리', '연결 리스트', '스택'],
    answer: 1,
    explain: 'B+ 트리는 노드 하나에 키를 많이 담아 트리 높이가 낮다. 디스크는 블록 단위로 읽으니 높이가 낮을수록 디스크 접근이 적다. 리프가 정렬된 채 연결되어 있어서 범위 조회(BETWEEN, ORDER BY)에도 강하다. 해시는 같은 값 찾기만 빠르고 범위 조회에 약하다.'
  },
  {
    id: 'db-05', topic: 'db', concept: 'JOIN', tier: 'core', level: 2, type: 'mc',
    prompt: '회원 테이블 LEFT JOIN 주문 테이블을 하면, 주문이 하나도 없는 회원은 결과에 어떻게 나올까?',
    choices: ['결과에서 빠진다', '회원 정보는 나오고 주문 컬럼은 NULL로 나온다', '에러가 난다', '주문 컬럼에 0이 채워진다'],
    answer: 1,
    explain: 'LEFT JOIN은 왼쪽 테이블의 모든 행을 유지하고, 오른쪽에 짝이 없으면 NULL로 채운다. INNER JOIN이었다면 짝이 있는 행만 남아서 주문 없는 회원은 빠진다.'
  },
  {
    id: 'db-06', topic: 'db', concept: 'N+1 문제', tier: 'good', level: 3, type: 'explain',
    prompt: '게시글 목록 10개를 가져온 뒤, 반복문으로 각 게시글의 작성자 정보를 하나씩 조회했다. 무엇이 문제이고 어떻게 고칠까?',
    keypoints: [
      '목록 조회 1번 + 작성자 조회 10번 = 쿼리 11번 (N+1)',
      '쿼리마다 DB 왕복 비용이 있어서 N이 커지면 급격히 느려진다',
      'JOIN이나 `IN (...)`으로 한 번에 가져온다',
      'ORM을 쓰면 즉시 로딩(eager loading) 옵션으로 해결한다'
    ],
    explain: '코드로는 반복문 안의 조회 한 줄이라 눈에 잘 안 띈다. 게시글 1000개면 쿼리 1001번. "반복문 안에서 DB를 부르고 있지 않은가"를 확인하는 습관이 핵심.'
  },
  {
    id: 'db-07', topic: 'db', concept: '정규화', tier: 'good', level: 2, type: 'ox',
    prompt: '정규화는 데이터 중복을 줄이지만, 조회할 때 JOIN이 늘어날 수 있다.',
    answer: true,
    explain: '정규화는 테이블을 쪼개서 같은 정보를 한 곳에만 둔다. 수정할 때 한 곳만 고치면 되지만, 합쳐서 볼 때는 JOIN이 필요하다. 읽기 성능 때문에 일부러 중복을 허용하는 것이 반정규화.'
  },
  {
    id: 'db-08', topic: 'db', concept: '격리 수준과 이상 현상', tier: 'later', level: 2, type: 'mc',
    prompt: '다른 트랜잭션이 아직 커밋하지 않은 데이터를 읽어버리는 현상(dirty read)이 허용되는 격리 수준은?',
    choices: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'],
    answer: 0,
    explain: '이름 그대로 커밋 안 된 것도 읽는다. 그 트랜잭션이 롤백되면 존재한 적 없는 값을 읽은 셈. 격리 수준이 높아질수록 이상 현상은 줄지만 동시 처리 성능은 떨어진다.'
  },

  // ───────────────────────── 웹과 백엔드 ─────────────────────────
  {
    id: 'web-01', topic: 'web', concept: '쿠키/세션/JWT', tier: 'core', level: 3, type: 'explain',
    prompt: '쿠키, 세션, JWT의 차이를 설명해보자. 특히 "로그인 정보가 어디에 저장되는가"를 기준으로.',
    keypoints: [
      '쿠키는 브라우저에 저장되고 요청마다 자동으로 전송되는 "운반 수단"이다',
      '세션: 로그인 정보는 서버에 저장하고, 쿠키에는 세션 ID만 담는다',
      'JWT: 정보를 서명된 토큰에 담아 클라이언트가 들고 다니고, 서버는 서명만 검증한다',
      'JWT는 서버가 상태를 안 가져서 확장이 쉽지만, 만료 전 강제 무효화가 어렵다'
    ],
    explain: '쿠키와 세션/JWT는 같은 층위가 아니다. 쿠키는 "어떻게 실어 보내나", 세션/JWT는 "무엇을 어디에 저장하나". 그래서 JWT를 쿠키에 담아 보내는 조합이 가능하다(아끼미에서 쓴 방식).'
  },
  {
    id: 'web-02', topic: 'web', concept: 'HttpOnly 쿠키', tier: 'core', level: 2, type: 'mc',
    prompt: '쿠키에 HttpOnly 옵션을 붙이는 목적은?',
    choices: ['HTTPS에서만 전송되게 하려고', '자바스크립트(`document.cookie`)로 읽지 못하게 해서 XSS로 탈취되는 것을 막으려고', '쿠키 크기를 늘리려고', '다른 도메인으로도 보내지게 하려고'],
    answer: 1,
    explain: '공격자가 페이지에 스크립트를 심어도(XSS) HttpOnly 쿠키는 JS에서 보이지 않아 토큰을 훔쳐갈 수 없다. HTTPS에서만 보내게 하는 건 Secure 옵션. 둘은 다른 공격을 막는다.'
  },
  {
    id: 'web-03', topic: 'web', concept: 'HTTP 메서드와 REST', tier: 'core', level: 1, type: 'mc',
    prompt: 'REST API에서 새 게시글을 생성할 때 일반적으로 쓰는 HTTP 메서드는?',
    choices: ['GET', 'POST', 'DELETE', 'HEAD'],
    answer: 1,
    explain: 'GET = 조회, POST = 생성, PUT/PATCH = 수정, DELETE = 삭제. 예: `POST /posts` 로 새 글 생성, `GET /posts/3` 으로 3번 글 조회.'
  },
  {
    id: 'web-04', topic: 'web', concept: 'HTTP 메서드와 REST', tier: 'core', level: 2, type: 'ox',
    prompt: 'GET 요청은 서버의 상태(데이터)를 바꾸지 않는 용도로 써야 한다.',
    answer: true,
    explain: 'GET은 "안전한(safe)" 메서드로 정의된다. 브라우저, 검색 엔진 크롤러, 캐시가 GET을 마음대로 다시 보내거나 미리 보낼 수 있어서, GET으로 삭제 같은 걸 만들면 의도치 않게 실행될 수 있다.'
  },
  {
    id: 'web-05', topic: 'web', concept: 'SQL 인젝션', tier: 'good', level: 3, type: 'explain',
    prompt: '`"SELECT * FROM users WHERE id = \'" + user_input + "\'"` 처럼 쿼리를 문자열로 이어붙이면 왜 위험하고, 어떻게 막을까?',
    keypoints: [
      '사용자 입력이 데이터가 아니라 SQL 코드의 일부로 해석될 수 있다',
      "예: 입력이 `' OR '1'='1` 이면 조건이 항상 참이 된다",
      '파라미터 바인딩(prepared statement)으로 입력을 값으로만 전달한다',
      '입력값을 직접 문자열로 쿼리에 끼워넣지 않는다'
    ],
    explain: '핵심은 "코드와 데이터를 섞지 않는다". 파라미터 바인딩을 쓰면 DB가 쿼리 구조를 먼저 해석하고, 입력은 나중에 값 자리에만 들어가서 SQL 문법으로 해석될 수 없다. MongoDB 같은 NoSQL에도 비슷한 인젝션이 있다.'
  },
  {
    id: 'web-06', topic: 'web', concept: 'CORS', tier: 'good', level: 2, type: 'mc',
    prompt: '프론트(localhost:3000)에서 백엔드(localhost:5000)로 요청했더니 CORS 에러가 났다. 이 요청을 막은 주체는?',
    choices: ['백엔드 서버', '브라우저', '운영체제 방화벽', 'DNS 서버'],
    answer: 1,
    explain: '포트가 다르면 다른 출처(origin)다. 동일 출처 정책은 브라우저가 지키는 규칙이라, 서버는 응답을 보냈어도 브라우저가 JS에게 넘겨주지 않는다. 서버가 `Access-Control-Allow-Origin` 헤더로 허용을 알려줘야 한다. 그래서 같은 요청을 curl로 보내면 문제없이 된다.'
  },
  {
    id: 'web-07', topic: 'web', concept: 'HTTP 캐싱 헤더', tier: 'later', level: 2, type: 'ox',
    prompt: '응답 헤더 `Cache-Control: no-store`는 브라우저와 중간 캐시가 그 응답을 저장하지 않도록 한다.',
    answer: true,
    explain: '`no-store`는 아예 저장하지 말라는 뜻. 헷갈리기 쉬운 `no-cache`는 저장은 해도 되지만 쓰기 전에 서버에 유효한지 확인하라는 뜻이다. 개인 정보가 담긴 응답에는 no-store를 쓴다.'
  }
];
