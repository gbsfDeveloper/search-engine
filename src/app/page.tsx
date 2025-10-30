'use client';
import {useState} from 'react';
import Header from "./components/Header";
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { InputBase, Combobox, useCombobox, Select, Image, ActionIcon, Button, Group, Input, Space, SegmentedControl, Fieldset, SimpleGrid, NumberInput, NativeSelect, Center, Box, Grid } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { ItemCard, TItemRarity, IElementalEffects, IItemAttributes, TItemType, TWeaponSubtypes } from './components/ItemCard/ItemCard';

interface IElementalEffectsForm extends IElementalEffects {
  key:string;
}
interface Attribute extends IItemAttributes{
  key: string;
}

interface WeaponForm {
  name: string;
  level: number;
  manufacturer: string;
  rarity: TItemRarity;
  dps: string;
  image: string;
  type: TItemType;
  class: string;
  shieldType: string;
  artilleryType: string;
  weaponType: TWeaponSubtypes;
  damage: string;
  accuracy: string;
  reloadSpeed: string;
  fireRate: string;
  magazineSize: string;
  elementalEffects: IElementalEffectsForm[];
  attributes: Attribute[];
  description: string;
}

export default function Home() {
  const form = useForm<WeaponForm>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      level: 1,
      manufacturer: 'Maliwan',
      rarity: 'common',
      dps: '',
      image: '',
      type: 'weapon',
      class: '',
      shieldType: '',
      artilleryType: '',
      weaponType: 'shotgun', 
      damage: '0', 
      accuracy: '0', 
      reloadSpeed: '0', 
      fireRate: '0', 
      magazineSize: '0', 
      elementalEffects: [],
      attributes: [],
      description: ''
    },
    onValuesChange: (values) => {
      // implement a debounce to give the user enough time to edit the field before update the state
      setSubmittedValues(values);
      console.log(values);
      
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const formValues = form.getValues();
  
  const options = [
    {image: '/icons/accuracy_increased_on_continuos_fire_icon.png', key: randomId()}
  ].map((item) => (
    <Combobox.Option value={item.image} key={item.key}>
      <Image
        radius="md"
        w={30}
        src={item.image}
      />
    </Combobox.Option>
  ));

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
  

  const elementalEffectsItems = formValues.elementalEffects.map((item, index) => (
    <Group key={item.key} mt="xs" grow>
      <Fieldset legend="Efecto 1">
        <Grid>
          <Grid.Col span={4}>
            <Center>
              <Box>
                <SegmentedControl 
                  data={[
                    { value: 'shock', label: 'E' },
                    { value: 'fire', label: 'F' },
                    { value: 'corrosive', label: 'Co' },
                    { value: 'radiation', label: 'R' },
                    { value: 'cryo', label: 'Cr' },
                  ]}
                  key={form.key(`elementalEffects.${index}.type`)}
                  {...form.getInputProps(`elementalEffects.${index}.type`)}
                  />
              </Box>
            </Center>
          </Grid.Col>
          <Grid.Col span={7}>
            <SimpleGrid cols={2} spacing="xs">
              <Input 
                placeholder="Daño/s" 
                key={form.key(`elementalEffects.${index}.damagePerSecond`)}
                {...form.getInputProps(`elementalEffects.${index}.damagePerSecond`)}
                />
              <Input 
                placeholder="Probabilidad" 
                key={form.key(`elementalEffects.${index}.chanceToApply`)}
                {...form.getInputProps(`elementalEffects.${index}.chanceToApply`)}
                />
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={1}>
            <ActionIcon color="red" onClick={() => form.removeListItem('elementalEffects', index)}>
              <IconTrash size={16} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      </Fieldset>
    </Group>
  ));

  const [value, setValue] = useState<string | null>(null);

  const attributesItems = formValues.attributes.map((item, index) => (
    <Group key={item.key} grow>
      <Fieldset legend={`Attribute ${index + 1}`}>
        <Grid grow>
          <Grid.Col span={2}>
            <Combobox
              store={combobox}
              onOptionSubmit={(val) => {
                console.log({val});
                
                // setValue(val);
                form.setFieldValue(`attributes.${index}.icon`, val);
                combobox.closeDropdown();
              }}
              
            >
              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  rightSectionPointerEvents="none"
                  onClick={() => combobox.toggleDropdown()}
                >
                  {item.icon ? <Image
                      radius="md"
                      w={20}
                      src={item.icon}
                    /> : <Input.Placeholder></Input.Placeholder>}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </Grid.Col>
          <Grid.Col span={3}>
            <Input 
              placeholder="Titulo" 
              key={form.key(`attributes.${index}.name`)}
              {...form.getInputProps(`attributes.${index}.name`)}
              />
          </Grid.Col>
          <Grid.Col span={5}>
            <Input 
              placeholder="Descripcion" 
              key={form.key(`attributes.${index}.description`)}
              {...form.getInputProps(`attributes.${index}.description`)}
              />
          </Grid.Col>
          <Grid.Col span={1}>
            <ActionIcon color="red" onClick={() => form.removeListItem('attributes', index)}>
              <IconTrash size={16} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      </Fieldset>
    </Group>
  ));

  return (
    <div>
      <Header/>
      <SimpleGrid cols={2} spacing="xs">
        <div className="p-5">
          <form onSubmit={form.onSubmit((values) => {
              console.log(values);
              setSubmittedValues(values);
            })}>

            <Fieldset legend="Nombre del Objeto">
                {/* <AutocompleteLoading 
                  placeholder="Item" 
                  key={form.key('name')} 
                  {...form.getInputProps('name')}
                  /> */}
                  <Input 
                    placeholder="Objeto" 
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    />
            </Fieldset>
            
            <Fieldset legend="Caracteristicas de Objeto">
                <Fieldset legend="Fabricante">
                  <Center>
                    <Box>
                      <SegmentedControl 
                        data={[
                          'Maliwan', 
                          'Ripper', 
                          'Order', 
                          'Jakobs', 
                          'Torgue',
                          'Daedalus',
                          'Tediore',
                        ]} 
                        key={form.key('manufacturer')} 
                        {...form.getInputProps('manufacturer')}
                        />
                    </Box>
                  </Center>
                </Fieldset>

                <Fieldset legend="Rareza">
                  <Center>
                    <Box>
                      <SegmentedControl 
                        data={[
                          { value: 'common', label: 'Común' },
                          { value: 'uncommon', label: 'Poco Común' },
                          { value: 'rare', label: 'Raro' },
                          { value: 'epic', label: 'Epico' },
                          { value: 'legendary', label: 'Legendario' },
                        ]}
                        key={form.key('rarity')} 
                        {...form.getInputProps('rarity')}
                        />
                    </Box>
                  </Center>
                </Fieldset>

                <SimpleGrid cols={2} spacing="xs">
                  <NumberInput
                    label="Nivel del Objeto"
                    placeholder="Valores de 1 a 50"
                    min={1}
                    max={50}
                    key={form.key('level')} 
                    {...form.getInputProps('level')}
                  />
                  <NumberInput
                    label="Daño por segundo"
                    placeholder="Valores de 1 a 1000000"
                    min={1}
                    max={1000000}
                    key={form.key('dps')} 
                    {...form.getInputProps('dps')}
                  />
                </SimpleGrid>
              <NativeSelect 
                label="Imagen del arma" 
                data={['Imagen1', 'Imagen2', 'imagen3', 'Imagen4']}
                key={form.key('image')} 
                {...form.getInputProps('image')} 
                />
            </Fieldset>
            
            <Fieldset legend="Tipo de Objeto">
              <Center>
                <Box>
                  <SegmentedControl 
                    disabled
                    data={[
                      { value: 'weapon', label: 'Arma' },
                      { value: 'artillery', label: 'Artilleria' },
                      { value: 'shield', label: 'Escudo' },
                      { value: 'medikit', label: 'Kit de reparación' },
                      { value: 'improvement', label: 'Mejora' },
                      { value: 'classMod', label: 'Modificador de clase' },
                    ]}
                    key={form.key('type')} 
                    {...form.getInputProps('type')} 
                    />
                </Box>
              </Center>
            </Fieldset>

            { formValues.type === 'classMod' && <Fieldset legend="Clase">
              <Center>
                <Box>
                  <SegmentedControl 
                    data={['Sirena', 'Soldado', 'Forjador', 'Gravitaria']}
                    key={form.key('class')} 
                    {...form.getInputProps('class')} 
                    />
                </Box>
              </Center>
            </Fieldset>}

            { formValues.type === 'shield' && <Fieldset legend="Tipo de escudo">
              <Center>
                <Box>
                  <SegmentedControl 
                    data={['Escudo de energía', 'Escudo de placas']}
                    key={form.key('shieldType')} 
                    {...form.getInputProps('shieldType')} 
                    />
                </Box>
              </Center>
            </Fieldset>}

            { formValues.type === 'artillery' && <Fieldset legend="Tipo de Artilleria">
              <Center>
                <Box>
                  <SegmentedControl 
                    data={['Cuchillo', 'Artilleria de granada', 'Artilleria de granadas', 'Artilleria de armas pesadas', ]}
                    key={form.key('artilleryType')} 
                    {...form.getInputProps('artilleryType')} 
                    />
                </Box>
              </Center>
            </Fieldset>}

            { formValues.type === 'weapon' &&  <Fieldset legend="Tipo de Arma">
              <Center>
                <Box>
                  <SegmentedControl 
                    data={[
                      { value: 'shotgun', label: 'Escopeta' },
                      { value: 'sniper', label: 'Fusil de francotirador' },
                      { value: 'assaultRifle', label: 'Fusil de asalto' },
                      { value: 'pistol', label: 'Pistola' },
                      { value: 'smg', label: 'Subfusil' },
                    ]}
                    key={form.key('weaponType')} 
                    {...form.getInputProps('weaponType')} 
                    />
                </Box>
              </Center>
            </Fieldset>}
            
            <Fieldset legend="Caracteristicas del Objeto">
              <SimpleGrid cols={5} spacing="xs">
                <NumberInput
                    label="Daño"
                    placeholder="1"
                    min={1}
                    max={1000000}
                    key={form.key('damage')} 
                    {...form.getInputProps('damage')}
                />
                <NumberInput
                    label="Precision"
                    placeholder="1"
                    min={1}
                    max={1000000}
                    key={form.key('accuracy')} 
                    {...form.getInputProps('accuracy')}
                />
                <NumberInput
                    label="Velocidad de recarga"
                    placeholder="1"
                    min={1}
                    max={1000000}
                    key={form.key('reloadSpeed')} 
                    {...form.getInputProps('reloadSpeed')}
                />
                <NumberInput
                    label="Cadencia de fuego"
                    placeholder="1"
                    min={1}
                    max={1000000}
                    key={form.key('fireRate')} 
                    {...form.getInputProps('fireRate')}
                />
                <NumberInput
                    label="Tamaño de cargador"
                    placeholder="1"
                    min={1}
                    max={1000000}
                    key={form.key('magazineSize')} 
                    {...form.getInputProps('magazineSize')}
                />
              </SimpleGrid>
            </Fieldset>
            
            <Fieldset legend="Efectos Elementales">
              {elementalEffectsItems}
              <Group justify="center" mt="md">
                <Button
                  onClick={() =>
                    form.insertListItem('elementalEffects', { type:'fire', damagePerSecond:'', chanceToApply:'', cryoEffectiveness:'', key: randomId()})
                  }
                >
                  Añadir Elemento
                </Button>
              </Group>
            </Fieldset>

            <Fieldset legend="Atributos">
              {attributesItems}
              <Group justify="center" mt="md">
                <Button
                  onClick={() =>
                    form.insertListItem('attributes', {icon:'', name:'', description:'', key: randomId()})
                  }
                >
                  Añadir Atributo
                </Button>
              </Group>
            </Fieldset>
            
            { formValues.rarity === 'legendary' &&  <Fieldset legend="Descripcion">
              <Input 
                placeholder="Descripcion" 
                key={form.key('description')} 
                {...form.getInputProps('description')}
                />
            </Fieldset>}

            {/* <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group> */}
          </form>
        </div>
        <div className=''>
          <Center>
            <ItemCard 
              itemName={formValues.name}
              itemLevel={formValues.level}
              itemRarity={formValues.rarity}
              itemType={formValues.type}
              itemSubType={formValues.weaponType}
              itemDPS={parseInt(formValues.dps)}
              hasElementalEffect={formValues.elementalEffects.length > 0}
              elementalEffects={
                formValues.elementalEffects
              }
              itemProperties={{
                  damage: !isNaN(parseInt(formValues.damage)) ? formValues.damage : '0',
                  accuracy: !isNaN(parseInt(formValues.accuracy)) ? parseInt(formValues.accuracy) : 0,
                  reloadSpeed: formValues.reloadSpeed,
                  fireRate: formValues.fireRate,
                  magazineSize: !isNaN(parseInt(formValues.magazineSize)) ?  parseInt(formValues.magazineSize) : 0
              }}
              attributes={formValues.attributes}
              descriptionText={formValues.description}
              manufacturer={formValues.manufacturer}
              language={'spanish'}
            />   
          </Center>
        </div>
      </SimpleGrid>

    </div>
  );
}
