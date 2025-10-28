'use client';
import {useState} from 'react';
import Header from "./components/Header";
import { AutocompleteLoading } from "./components/AutocompleteInput";
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { ActionIcon, Button, Group, Input, Space, SegmentedControl, Fieldset, SimpleGrid, NumberInput, NativeSelect, Center, Box, Grid } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export default function Home() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      level: 1,
      manufacturer: '',
      rarity: '',
      dps: '',
      image: '',
      type: '',
      class: '',
      shieldType: '',
      artilleryType: '',
      weaponType: '', 
      damage: '', 
      accuracy: '', 
      reloadSpeed: '', 
      fireRate: '', 
      magazineSize: '', 
      elementalEffects: [
        {type:'', damagePerSecond:'', chanceToApply:'', cryoEffectiveness:'', key: randomId()}
      ],
      attributes: [
        {icon:'', description:'', key: randomId()}
      ],
      description: ''
    },
    onValuesChange: (values) => {
      // implement a debounce to give the user enough time to edit the field before update the state
      setSubmittedValues(values);
      console.log(values);
      
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
  
  const formValues = form.getValues();

  const elementalEffectsItems = formValues.elementalEffects.map((item, index) => (
    <Group key={item.key} mt="xs" grow>
      <Fieldset legend="Efecto 1">
        <Grid>
          <Grid.Col span={4}>
            <Center>
              <Box>
                <SegmentedControl 
                  data={['E', 'F', 'Co', 'R', 'Cr']}
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

  const attributesItems = formValues.attributes.map((item, index) => (
    <Group key={item.key} grow>
      <Fieldset legend={`Attribute ${index + 1}`} >
        <Grid>
          <Grid.Col span={4}>
            <NativeSelect 
              data={['Icono', 'Imagen1', 'Imagen2', 'Imagen3']} 
              key={form.key(`attributes.${index}.icon`)}
              {...form.getInputProps(`attributes.${index}.icon`)}
              />
          </Grid.Col>
          <Grid.Col span={8}>
            <Input 
              placeholder="Descripcion" 
              key={form.key(`attributes.${index}.description`)}
              {...form.getInputProps(`attributes.${index}.description`)}
              />
          </Grid.Col>
        </Grid>
      </Fieldset>
    </Group>
  ));

  return (
    <div>
      <Header/>
      <div className="w-[50%] p-10">
        <form onSubmit={form.onSubmit((values) => {
            console.log(values);
            setSubmittedValues(values);
          })}>

          <Fieldset legend="Nombre del Objeto">
              <AutocompleteLoading 
                placeholder="Item" 
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
                      data={['Comun', 'Poco Común', 'Raro', 'Epico', 'Legendario']}
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
          
          <Fieldset legend="Tipo de Item">
            <Center>
              <Box>
                <SegmentedControl 
                  data={['Arma', 'Artilleria', 'Escudo', 'Kit de reparación', 'Mejora', 'Modificador de clase']}
                  key={form.key('type')} 
                  {...form.getInputProps('type')} 
                  />
              </Box>
            </Center>
          </Fieldset>

          { formValues.type === 'Modificador de clase' && <Fieldset legend="Clase">
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

          { formValues.type === 'Escudo' && <Fieldset legend="Tipo de escudo">
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

          { formValues.type === 'Artilleria' && <Fieldset legend="Tipo de Artilleria">
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

          { formValues.type === 'Arma' &&  <Fieldset legend="Tipo de Arma">
            <Center>
              <Box>
                <SegmentedControl 
                  data={['Escopeta', 'Subfusil', 'Fusil de Francotirador', 'Fusil de asalto', 'Pistola']}
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
                  form.insertListItem('elementalEffects', { type:'', damagePerSecond:'', chanceToApply:'', cryoEffectiveness:'', key: randomId()})
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
                  form.insertListItem('elementalEffects', { type:'', damagePerSecond:'', chanceToApply:'', cryoEffectiveness:'', key: randomId()})
                }
              >
                Añadir Atributo
              </Button>
            </Group>
          </Fieldset>
          
          { formValues.rarity === 'Legendario' &&  <Fieldset legend="Descripcion">
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

    </div>
  );
}
