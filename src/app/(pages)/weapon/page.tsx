import { text } from "stream/consumers";
import Header from "../../components/header";

interface ItemCardProps {
  itemName: string;
  itemLevel?: number;
  itemRarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  itemType?: 'weapon' | 'shield' | 'artillery' | 'classMod';
  itemSubType?: string;
  itemDPS?: number;
  hasElementalEffect?: boolean;
}

export default function Page() {
  return (
    <ItemCard 
        itemName="Accelerated Crepuscular Kickballer"
        itemLevel={50}
        itemRarity="rare"
        itemType="weapon"
        itemDPS={3075}
        hasElementalEffect={true}
    >
        
    </ItemCard>
  );
}


const  ItemCard = ({ 
    itemName,
    itemLevel,
    itemRarity = 'common',
    itemType = 'weapon',
    itemSubType = 'Escopeta',
    itemDPS,
    hasElementalEffect = false
 }:ItemCardProps) =>{
    
    const TriangleElementsComponent = () =>{
        let trianglesColored = 0;
        let trianglesUncolored = 4;

        const trianglesStyles = {
            borderBottom: 'border-b-[10px] border-b-common',
            borderTop: 'border-t-[10px] border-t-common',
        }

        switch (itemRarity) {
            case 'uncommon':
                trianglesColored += 1;
                trianglesUncolored -= 1;
                trianglesStyles.borderBottom = `border-b-[10px] border-b-uncommon`;
                trianglesStyles.borderTop = `border-t-[10px] border-t-uncommon`;
                break;
            case 'rare':
                trianglesColored += 2;
                trianglesUncolored -= 2;
                trianglesStyles.borderBottom = `border-b-[10px] border-b-rare`;
                trianglesStyles.borderTop = `border-t-[10px] border-t-rare`;
                break;
            case 'epic':
                trianglesColored += 3;
                trianglesUncolored -= 3;
                trianglesStyles.borderBottom = `border-b-[10px] border-b-epic`;
                trianglesStyles.borderTop = `border-t-[10px] border-t-epic`;
                break;
            case 'legendary':
                trianglesColored += 4;
                trianglesUncolored -= 4;
                trianglesStyles.borderBottom = `border-b-[10px] border-b-legendary`;
                trianglesStyles.borderTop = `border-t-[10px] border-t-legendary`;
                break;
            default:
                trianglesStyles.borderBottom = 'border-b-[10px] border-b-common';
                trianglesStyles.borderTop = 'border-t-[10px] border-t-common';
                break;
        }

        return (
            <div className="items-center w-[50px] grid grid-cols-4">
                {
                    Array.from({length: 4}, (_, index) => {
                        const currentNumber = index + 1;
                        const isEvenNumber = index % 2 === 0;
                        let triangleStyle = isEvenNumber 
                            ? trianglesStyles.borderBottom 
                            : trianglesStyles.borderTop;
                        if(currentNumber > trianglesColored) {
                            triangleStyle = isEvenNumber  
                                ? `border-b-[10px] border-b-grey-800`
                                : `border-t-[10px] border-t-grey-800`;
                        }
                        return <div key={index} className={`
                                w-0 h-0 
                                border-l-[10px] border-l-transparent
                                ${triangleStyle}
                                border-r-[10px] border-r-transparent
                            `}>
                        </div>
                    })
                }
            </div>
        )
    }

    const cardDynamicStyles = {
        textColor: 'text-common',
        borderTop: 'border-t-common',
        borderBottom: 'border-b-common',
    } 
    switch (itemRarity) {
        case 'uncommon':
            cardDynamicStyles.textColor = `text-uncommon`;
            cardDynamicStyles.borderTop = `border-t-uncommon`;
            cardDynamicStyles.borderBottom = `border-b-uncommon`;
            break;
        case 'rare':
            cardDynamicStyles.textColor = `text-rare`;
            cardDynamicStyles.borderTop = `border-t-rare`;
            cardDynamicStyles.borderBottom = `border-b-rare`;
            break;
        case 'epic':
            cardDynamicStyles.textColor = `text-epic`;
            cardDynamicStyles.borderTop = `border-t-epic`;
            cardDynamicStyles.borderBottom = `border-b-epic`;
            break;
        case 'legendary':
            cardDynamicStyles.textColor = `text-legendary`;
            cardDynamicStyles.borderTop = `border-t-legendary`;
            cardDynamicStyles.borderBottom = `border-b-legendary`;
            break;
        default:
            cardDynamicStyles.textColor = `text-common`;
            cardDynamicStyles.borderTop = `border-t-common`;
            cardDynamicStyles.borderBottom = `border-b-common`;
            break;
        }
    const divWithTwoLinesColored = `border-t-2 ${cardDynamicStyles.borderTop} border-b-2 ${cardDynamicStyles.borderBottom}`;

    return (
        <div className="bg-card-background rounded-lg w-[400px] p-5 shadow-lg">
        <div className={divWithTwoLinesColored}>
            <div className="h-2"></div>
            <div className="grid grid-cols-4 text-center mb-1">
                <div className="text-lg  text-start col-start-1 col-end-4 leading-none">{itemName}</div>
                <div className="text-lg text-end text-white leading-none">Nv. {itemLevel}</div>
            </div>
            <div className="grid grid-cols-6">
                <TriangleElementsComponent/>
                <div className={cardDynamicStyles.textColor}>{itemSubType}</div>
            </div>

            
            <div className="grid grid-cols-4 text-center">
                <div className="bg-alpha-step-1 font-bold">{itemDPS} <span className="text-[12px]" >DPS</span></div>
            </div>
            <div className="h-2"></div>
        </div>
        
        <div className="h-2"></div>

        <div className="grid grid-cols-5 gap-1">
            <div className="bg-alpha-step-1 rounded-lg text-center py-5"><span className="text-[10px]">Daño:</span> 4,612</div>
            <div className="bg-alpha-step-1 rounded-lg text-center py-5"><span className="text-[10px]">Presicion:</span> 79%</div>
            <div className="bg-alpha-step-1 rounded-lg text-center py-5"><span className="text-[10px]">Vel.Recarga:</span> 2.0s</div>
            <div className="bg-alpha-step-1 rounded-lg text-center py-5"><span className="text-[10px]">Cad.Fuego:</span> 0.8/s</div>
            <div className="bg-alpha-step-1 rounded-lg text-center py-5"><span className="text-[10px]">Tam.Cargador:</span> 8</div>
        </div>

        <div className="h-2"></div>
        
        {
            hasElementalEffect ? <div className="grid grid-cols-3 gap-1 text-center border-t-2 border-b-2 border-shock">
                <div className="text-base text-shock">E1 E2</div>
                <div className="text-base text-shock">18.225 DMG/s</div>
                <div className="text-base text-shock">9% Chance</div>
            </div> : null
        }

        <div className="h-3"></div>

        <div>
            <div className="mb-3">
                <div className="text-sm text-yellow">Force Blunt</div>
            </div>

            <div className="mb-3">
                <div className="text-sm text-gray-400"><span className="text-rare">Jakobs-Licensed Accessory</span> - <span className="text-rare">Critical Hits</span> will Ricochet Projectiles to nearby <span className="text-rare">enemies</span></div>
            </div>
            
            <div className="mb-3">
                <div className="text-sm text-gray-400"><span className="text-rare">Hyperion-Licensed Grip</span> - <span className="text-rare">Accuracy</span> increases with continuous fire</div>
            </div>
            
            <div className="mb-3">
                <div className="text-sm text-gray-400"> <span className="text-rare">Maliwan</span> - Can switch between <span className="text-shock">Shock</span> and Cryo Elements</div>
            </div>
        </div>
    </div>
    )
}