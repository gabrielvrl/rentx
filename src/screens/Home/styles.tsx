import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { Car as ModelCar} from '../../database/model/Car';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  
  background-color: ${({ theme }) => theme.colors.header};
  
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new (props: FlatListProps<ModelCar>) => FlatList<ModelCar>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false
})``;

export const MyCarsButtonWrapper = styled.View`
   width:100%;
   height:60px;

   justify-content:center;
   align-items:flex-end;

   position:absolute;
   bottom:13px;
   right:22px;

`;

export const MyCarsButton = styled(Animated.createAnimatedComponent(RectButton))`
   width:60px;
   height:60px;

   border-radius:30px;

   align-items:center;
   justify-content:center;

   background-color:${({theme}) => theme.colors.main}

`;