"use client"
import React, { use, useEffect, useState } from "react";
import Image from 'next/image'

interface IElementalEffects {
    type: 'fire' | 'shock' | 'corrosive' | 'cryo' | 'radiation';
    damagePerSecond: number;
    chanceToApply: number;
    cryoEffectiveness?: number;
}

interface IWeaponProperties {
    damage: string;
    accuracy: number;
    reloadSpeed: string;
    fireRate: string;
    magazineSize: number;
}

interface IItemAttributes {
    icon: string;
    name: string;
    description: string;
    manufacturer?: string;
}

type TWeaponSubtypes = keyof typeof WEAPON_SUBTYPES;

const WEAPON_SUBTYPES = {
    'shotgun': {english: 'Shotgun', spanish: 'Escopeta'},
    'sniper': {english: 'Sniper Rifle', spanish: 'Fusil de francotirador'},
    'assaultRifle': {english: 'Assault Rifle', spanish: 'Fusil de asalto'},
    'pistol': {english: 'Pistol', spanish: 'Pistola'},
    'smg': {english: 'Submachine Gun', spanish: 'Subfusil'},
}

interface IItemCardProps {
  itemName: string;
  itemLevel?: number;
  itemRarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  itemType?: 'weapon' | 'shield' | 'artillery' | 'classMod';
  itemSubType?: TWeaponSubtypes;
  itemDPS?: number;
  hasElementalEffect?: boolean;
  weaponProperties?: IWeaponProperties
  elementalEffects?: IElementalEffects[];
  attributes?: IItemAttributes[];
  manufacturer?: string;
  descriptionText?: string;
  language: string;
}

const getWeaponName = (itemSubType : TWeaponSubtypes, language: string) =>{
    let weaponName = '';
    switch(language){
        case 'spanish':
            weaponName = WEAPON_SUBTYPES[itemSubType].spanish
            break;
        default:
            weaponName = WEAPON_SUBTYPES[itemSubType].english
            break;
    }

    return WEAPON_SUBTYPES[itemSubType] ? WEAPON_SUBTYPES[itemSubType].spanish : itemSubType;
}

export default function Page() {
    const [language, setLanguage] = useState('spanish');
    
    return (
        <div className="flex flex-row gap-5 p-5 bg-background">
            <ItemCard 
                itemName="Sychrotron Anaretic El ascenso de Asher"
                itemLevel={50}
                itemRarity="legendary"
                itemType="weapon"
                itemSubType="sniper"
                itemDPS={1098}
                hasElementalEffect={true}
                elementalEffects={[
                    { 
                        type: 'corrosive',
                        damagePerSecond: 1140,
                        chanceToApply: 0
                    },
                    { 
                        type: 'shock',
                        damagePerSecond: 1458,
                        chanceToApply: 10
                    }
                ]}
                weaponProperties={{
                    damage: '1573',
                    accuracy: 88,
                    reloadSpeed: '1.9',
                    fireRate: '0.8',
                    magazineSize: 15
                }}
                attributes={[
                    {
                        icon: '/icons/legendary_effect_icon.png',
                        name: 'A fuego lento:',
                        description: 'los impactos criticos aplican efectos de estado en lugar de aumentar el daño'
                    },
                    {
                        icon: '/icons/critical_shot_icon.png',
                        name: 'Accesorio licenciado de Jakobs:',
                        description: 'Los impactos criticos hacen rebotar los proyectiles a enemigos cercanos'
                    },
                    {
                        icon: '/icons/charges_before_full_aurofire_icon.png',
                        name: 'Cargador licenciado de destripador:',
                        description: 'esta arma se carga antes de disparar en modo automático'
                    },
                    {
                        icon: '/icons/switch_between_elements_icon.png',
                        name: 'Maliwan:',
                        description: 'puede cambiar entre elementos corrosivos y eléctricos'
                    },

                ]}
                descriptionText="¿Cómo podíamos tener alguna mínima idea de lo que se avecina?"
                manufacturer="Maliwan"
                language={language}
            >
                
            </ItemCard>
            <ItemCard 
                itemName="Crepuscular Ephemeris"
                itemLevel={49}
                itemRarity="uncommon"
                itemType="weapon"
                itemSubType="smg"
                itemDPS={2115}
                hasElementalEffect={true}
                elementalEffects={[
                    { 
                        type: 'cryo',
                        damagePerSecond: 104,
                        chanceToApply: 0,
                        cryoEffectiveness: 104
                    }
                ]}
                weaponProperties={{
                    damage: '415',
                    accuracy: 82,
                    reloadSpeed: '2.5',
                    fireRate: '7.3',
                    magazineSize: 43
                }}
                attributes={[
                    {
                        icon: '/icons/energy_discharge_icon.png',
                        name: '[Disparo alternativo]',
                        description: 'Descarga de energia: Carga y dispara un rayo que inflige 6119 de daño'
                    },
                ]}
                manufacturer="Maliwan"
                language={language}
            >
                
            </ItemCard>
            <ItemCard 
                itemName="Ritualized Gallardete"
                itemLevel={50}
                itemRarity="legendary"
                itemType="artillery"
                // itemSubType=""
                itemDPS={2115}
                hasElementalEffect={true}
                elementalEffects={[
                    { 
                        type: 'cryo',
                        damagePerSecond: 104,
                        chanceToApply: 0,
                        cryoEffectiveness: 104
                    }
                ]}
                weaponProperties={{
                    damage: '415',
                    accuracy: 82,
                    reloadSpeed: '2.5',
                    fireRate: '7.3',
                    magazineSize: 43
                }}
                attributes={[
                    {
                        icon: '/icons/energy_discharge_icon.png',
                        name: '[Disparo alternativo]',
                        description: 'Descarga de energia: Carga y dispara un rayo que inflige 6119 de daño'
                    },
                ]}
                manufacturer="Maliwan"
                language={language}
            />
        </div>
    );
}


const  ItemCard = ({ 
    itemName,
    itemLevel,
    itemRarity = 'common',
    itemType = 'weapon',
    itemSubType = 'shotgun',
    itemDPS,
    hasElementalEffect = false,
    elementalEffects = [],
    weaponProperties,
    manufacturer,
    descriptionText,
    language = 'spanish',
    attributes = []
 }: IItemCardProps) =>{
    
    const ElementalDamagesComponent = ({
        elementalEffects
    }:{ 
        elementalEffects: IElementalEffects[]
    }) =>{
        const [currentElementData, setCurrentElementData] = useState(elementalEffects[0]);
        const [currentElementSyles, setCurrentElementStyles] = useState({
            containerClassName: 'flex justify-evenly gap-1 text-center border-t-2 border-b-2 border-fire',
            textClassName: 'text-base text-fire'
        });

        useEffect(()=>{
            let effectIndex = 0;
            const interval = setInterval(()=>{
                effectIndex = (effectIndex + 1) % elementalEffects.length;
                setCurrentElementData(elementalEffects[effectIndex]);    
                
                const elementStyles = {
                    containerClassName: 'flex justify-evenly gap-1 text-center border-t-2 border-b-2 border-fire',
                    textClassName: 'text-base text-fire'
                };

                switch(elementalEffects[effectIndex].type){
                    case 'fire':
                        elementStyles.containerClassName = 'flex justify-evenly gap-1 text-center border-t-2 border-b-2 border-fire';
                        elementStyles.textClassName = 'text-base text-fire';
                        break;
                    case 'shock':
                        elementStyles.containerClassName = 'flex justify-evenly gap-1 text-center border-t-2 border-b-2 border-shock';
                        elementStyles.textClassName = 'text-base text-shock';
                        break;
                    case 'corrosive':
                        elementStyles.containerClassName = 'flex justify-evenly gap-1 text-center border-t-2 border-b-2 border-corrosive';
                        elementStyles.textClassName = 'text-base text-corrosive';
                        break;
                    case 'cryo':
                        elementStyles.containerClassName = 'flex justify-center gap-1 text-center border-t-2 border-b-2 border-cryo';
                        elementStyles.textClassName = 'text-base text-cryo';
                        break;
                    case 'radiation':
                        elementStyles.containerClassName = 'flex justify-evenly gap-1 text-center border-t-2 border-b-2 border-radiation';
                        elementStyles.textClassName = 'text-base text-radiation';
                        break;
                }
                
                setCurrentElementStyles(elementStyles);
            }, 1500);


            return () => clearInterval(interval);
        }, [elementalEffects]);

        return <div className={currentElementSyles.containerClassName}>
                    <div className="grid place-items-center w-[20px] h-[20px] min-w-[20px]">
                        <Image
                            alt={""}
                            width={20}
                            height={20}
                            src={`/icons/${currentElementData.type}_element_icon.png`}
                        />
                    </div>
                    {currentElementData.type === "cryo" && <div className={currentElementSyles.textClassName}>Eficacia glacial: {currentElementData.cryoEffectiveness}%</div>}
                    {currentElementData.type !== "cryo" && <div className={currentElementSyles.textClassName}>{currentElementData.damagePerSecond} de daño/s</div>}
                    {currentElementData.type !== "cryo" && <div className={currentElementSyles.textClassName}>{currentElementData.chanceToApply}% de probabilidad</div>}
                </div> 
    }

    const AttributesComponent = ({
        attributes
    }:{ 
        attributes: IItemAttributes[]
    }) =>{

        return(
            <div>
                {
                    attributes.map((value, index)=>(
                        <div key={index} className="flex gap-1 items-center">
                            <div className="grid place-items-center bg-attributes-icon-bg w-[50px] h-[50px] min-w-[50px]">
                                <Image
                                    alt={value.name}
                                    width={30}
                                    height={30}
                                    src={value.icon}
                                />
                            </div>
                            <div className="text-sm">
                                <span>{value.name}:{value.description}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

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
        textColor: 'text-common col-span-5',
        borderTop: 'border-t-common',
        borderBottom: 'border-b-common',
    } 
    switch (itemRarity) {
        case 'uncommon':
            cardDynamicStyles.textColor = `text-uncommon col-span-5`;
            cardDynamicStyles.borderTop = `border-t-uncommon`;
            cardDynamicStyles.borderBottom = `border-b-uncommon`;
            break;
        case 'rare':
            cardDynamicStyles.textColor = `text-rare col-span-5`;
            cardDynamicStyles.borderTop = `border-t-rare`;
            cardDynamicStyles.borderBottom = `border-b-rare`;
            break;
        case 'epic':
            cardDynamicStyles.textColor = `text-epic col-span-5`;
            cardDynamicStyles.borderTop = `border-t-epic`;
            cardDynamicStyles.borderBottom = `border-b-epic`;
            break;
        case 'legendary':
            cardDynamicStyles.textColor = `text-legendary col-span-5`;
            cardDynamicStyles.borderTop = `border-t-legendary`;
            cardDynamicStyles.borderBottom = `border-b-legendary`;
            break;
        default:
            cardDynamicStyles.textColor = `text-common col-span-5`;
            cardDynamicStyles.borderTop = `border-t-common`;
            cardDynamicStyles.borderBottom = `border-b-common`;
            break;
    }

    const firstSectionContainerStyles = `border-t-2 ${cardDynamicStyles.borderTop} border-b-2 ${cardDynamicStyles.borderBottom}`;

    return (
        <div className="bg-card-background rounded-lg w-[420px] p-5 shadow-lg">
        <div className={firstSectionContainerStyles}>
            <div className="h-2"></div>
            <div className="grid grid-cols-4 text-center mb-1">
                <div className="text-lg text-start col-start-1 col-end-4 leading-none">{itemName}</div>
                <div className="text-lg text-end text-white leading-none">Nivel {itemLevel}</div>
            </div>
            <div className="grid grid-cols-6">
                <TriangleElementsComponent/>
                <div className={cardDynamicStyles.textColor}>{getWeaponName(itemSubType, language)}</div>
            </div>

            <div className="grid grid-cols-4 text-center">
                <div className="bg-alpha-step-1 font-bold">{itemDPS}<span className="text-[12px]" > DPS</span></div>
            </div>
            <div className="h-2"></div>
        </div>
        
        <div className="h-2"></div>

        {
            itemType === 'weapon'
                ? <div className="grid grid-cols-5 gap-1">
                    <div className="grid grid-cols-1 place-items-center py-2 text-center bg-alpha-step-1 rounded-lg">
                        <div className="grid place-items-center bg-attributes-icon-bg w-[30px] h-[30px] min-w-[30px]">
                            <Image
                                alt={'Daño'}
                                width={30}
                                height={30}
                                src={'/icons/damage_icon.png'}
                            />
                        </div>
                        <div className="h-1"></div>
                        <span>{weaponProperties?.damage}</span>
                    </div>
                    <div className="grid grid-cols-1 place-items-center py-2 text-center bg-alpha-step-1 rounded-lg">
                        <div className="grid place-items-center bg-attributes-icon-bg w-[30px] h-[30px] min-w-[30px]">
                            <Image
                                alt={'Presicion'}
                                width={30}
                                height={30}
                                src={'/icons/accuracy_icon.png'}
                            />
                        </div>
                        <div className="h-1"></div>
                        <span>{weaponProperties?.accuracy}%</span>
                    </div>
                    <div className="grid grid-cols-1 place-items-center py-2 text-center bg-alpha-step-1 rounded-lg">
                        <div className="grid place-items-center bg-attributes-icon-bg w-[30px] h-[30px] min-w-[30px]">
                            <Image
                                alt={'Vel.Recarga'}
                                width={30}
                                height={30}
                                src={'/icons/reload_speed_icon.png'}
                            />
                        </div>
                        <div className="h-1"></div>
                        <span>{weaponProperties?.reloadSpeed}s</span>
                    </div>
                    <div className="grid grid-cols-1 place-items-center py-2 text-center bg-alpha-step-1 rounded-lg">
                        <div className="grid place-items-center bg-attributes-icon-bg w-[30px] h-[30px] min-w-[30px]">
                            <Image
                                alt={'Cad.Fuego'}
                                width={30}
                                height={30}
                                src={'/icons/fire_cadence_icon.png'}
                            />
                        </div>
                        <div className="h-1"></div>
                        <span>{weaponProperties?.fireRate}/s</span>
                    </div>
                    <div className="grid grid-cols-1 place-items-center py-2 text-center bg-alpha-step-1 rounded-lg">
                        <div className="grid place-items-center bg-attributes-icon-bg w-[30px] h-[30px] min-w-[30px]">
                            <Image
                                alt={'Tam.Cargador'}
                                width={30}
                                height={30}
                                src={'/icons/magazine_size_icon.png'}
                            />
                        </div>
                        <div className="h-1"></div>
                        <span>{weaponProperties?.magazineSize}</span>
                    </div>
                </div>
                : null
        }

        <div className="h-2"></div>
        
        {
            // if the weapon has 2 elemental effects , cycle an array with the values.
            hasElementalEffect 
                ? <ElementalDamagesComponent elementalEffects={elementalEffects} />
                : null
        }

        <div className="h-3"></div>

        <AttributesComponent attributes={attributes}/>
        
        <div className="h-3"></div>
       
        {
            descriptionText &&
            <div className="border-t-2 border-t-gray-500 text-center">
                <div className="h-1"></div>
                <span className="text-legendary-description">{descriptionText}</span>
            </div>
        }

        <div>
            <span className="text-yellow-200">{manufacturer}</span>
        </div>
    </div>
    )
}