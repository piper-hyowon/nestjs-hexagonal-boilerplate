
### Hexagonal Architecture
##### ==  Ports and Adapters Architecture
1. Domain
2. Port
3. Adapter

### port
= contracts (usecase)
### adapter
 **bridge**  between the core application and the external concerns(APIs, DBs, UI..). 
#

- 주된 아이디어: 비즈니스 코드를 기술 코드로부터 분리
  + 기술측면이 비즈니스 측면에 의존하는지 확인
1. 비즈니스 측면이 비즈니스 목표를 달성하는데 사용하는 기술에 대한 우려 없이도 발전할 수 있도록 해야한다.
2. 비즈니스 코드에 피해를 주지 않고도 기술 코드를 변경할 수 있어야 한다.

#
├── ***domain***


│   ├── 도메인 모델


│   └── Enums...


├── ***application***
│   ├── mappers

│   ├── port(IRepository)


│   └── Service



├── ***adapter***


│   └── persistence (IRepository 를 구현)


│         └──── orm


 │   └── presenter


│         └──── REST api (controller)

 │   └── external








![image](https://github.com/piper-hyowon/nestjs-hexagonal-boilerplate/assets/158791917/075e4aea-6a62-425f-8eb4-f89fd1c33fe3)

![image](https://github.com/piper-hyowon/nestjs-hexagonal-boilerplate/assets/158791917/07a5c952-96da-4570-9686-e09e5c6a1446)

(이미지 출처: https://www.linkedin.com/pulse/layered-architecture-vs-hexagonal-ahmed-al-sharu-jy3ef)

