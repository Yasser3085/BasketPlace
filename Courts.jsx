import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from './Card';
import { Flex, chakra,useMediaQuery,Box,useBreakpointValue } from '@chakra-ui/react';

export default function CardCarousel({ filterText }) {
  
  const cards = [
    {
      name: "3x3 Court al-Yasmin",
      title: "basket ball court with tennis , able to play 3x3 or 4x4 .",
      Src: "https://www.snapsports.com/wp-content/uploads/2023/05/orange-gray-header.jpg",
      description:'the court closing at 12:00 pm ',
      price : ' 80$'
    },
    {
      name: "4x4 Court Near to the sea",
      title: "the court located in jeddah ",
      Src: "https://thumbor.bigedition.com/angels-gate-park-in-san-pedro-california/HX7eZfZ-SAWLtljgyhRiyWqmSTI=/480x360/filters:format(webp):quality(80)/granite-web-prod/69/b1/69b1eaae662041709e833f4f2bb437c1.jpeg",
      description:'the court closing at 12:00 pm ',
      price : ' 120$'
    },
    {
      name: '2x2 Court in dammam',
        title: "enjoy playing basket ball in dammam ",
      Src: 'https://media.istockphoto.com/id/1321863986/photo/empty-basketball-court-after-the-rain.jpg?s=612x612&w=0&k=20&c=_-Holm6k1OdnCqpgHUSUcwPDZR27wyiysKoGja4NxIQ=',
      description:'the court closing at 12:00 pm ',
      price : ' 40$'
    },
    {
      name: '1 versus 1 court in riyadh',
      title: "Beat Your friend in this court",
      Src: "https://mybasketballcourt.com/wp-content/uploads/2018/12/DeShayes-Dream-Courts-bernardsville_martin_basketball_driveway_court-1024x768.jpg",
      description:'the court closing at 12:00 pm ',
      price : ' 20$'
    }
    
  
  ];

  const filteredCards = filterText
    ? cards.filter((card) =>
        card.name.toLowerCase().startsWith(filterText.toLowerCase().trim())
      )
    : cards;

    
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Flex w={'90%'} height={'100px'} alignItems={'center'} mx={10} mt={5}>
        <chakra.h1 color={'#4D4E6C'} _dark={{color:"white"}} borderBottom={'1px solid #4D4E6C'} fontSize={'4xl'} fontFamily={'Viga'}>
          Discover Courts <br/>
          <chakra.h1 color={'#4D4E6C'} _dark={{color:"white"}} borderBottom={'1px solid #4D4E6C'} fontWeight='light' fontSize={'large'} fontFamily={'arial'} >
       
          Reserve Your Basket Ball Court Now 
        </chakra.h1>
        </chakra.h1>
        
      </Flex >
      


      <Box mx={10} >
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={true}
      axis='column'
   
          infiniteLoop={true}
          centerMode={true}
          swipeable={true}
          centerSlidePercentage='60'
        >
          {filteredCards.map((card) => (
            <Card key={card.name} name={card.name} title={card.title} Src={card.Src} description={card.description} price={card.price} />
          ))}
        </Carousel>
      </Box>


      {filterText && filteredCards.length === 0 && (
        <Flex justifyContent="center" alignItems="center" mt={5}>
          <chakra.p>No Courts Found .</chakra.p>
        </Flex>
      )}
  

    
    </>
  );
}
