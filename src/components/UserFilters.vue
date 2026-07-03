<template>
  <q-expansion-item
    icon="filter_alt"
    label="Filtros locales sin volver a consumir la API"
    class="bg-grey-1 rounded-borders q-mb-md"
    default-opened
  >
    <q-card flat bordered>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-2">
            <q-select
              :model-value="modelValue.gender"
              outlined
              clearable
              label="Género"
              :options="genderOptions"
              @update:model-value="updateFilter('gender', $event)"
            />
          </div>

          <div class="col-6 col-md-2">
            <q-input
              :model-value="modelValue.minAge"
              outlined
              clearable
              type="number"
              label="Edad mínima"
              @update:model-value="updateFilter('minAge', $event)"
            />
          </div>

          <div class="col-6 col-md-2">
            <q-input
              :model-value="modelValue.maxAge"
              outlined
              clearable
              type="number"
              label="Edad máxima"
              @update:model-value="updateFilter('maxAge', $event)"
            />
          </div>

          <div class="col-12 col-md-2">
            <q-select
              :model-value="modelValue.company"
              outlined
              clearable
              label="Empresa"
              :options="companyOptions"
              @update:model-value="updateFilter('company', $event)"
            />
          </div>

          <div class="col-12 col-md-2">
            <q-select
              :model-value="modelValue.city"
              outlined
              clearable
              label="Ciudad"
              :options="cityOptions"
              @update:model-value="updateFilter('city', $event)"
            />
          </div>

          <div class="col-12 col-md-2">
            <q-select
              :model-value="modelValue.country"
              outlined
              clearable
              label="País"
              :options="countryOptions"
              @update:model-value="updateFilter('country', $event)"
            />
          </div>

          <div class="col-12 text-right">
            <q-btn
              flat
              color="negative"
              icon="delete"
              label="Limpiar filtros"
              @click="clearFilters"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  users: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const genderOptions = ['male', 'female']

const companyOptions = computed(() => uniqueSorted(props.users.map((user) => user.company?.name)))

const cityOptions = computed(() => uniqueSorted(props.users.map((user) => user.address?.city)))

const countryOptions = computed(() => uniqueSorted(props.users.map((user) => user.address?.country)))

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort()
}

function updateFilter(key, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value === '' ? null : value,
  })
}

function clearFilters() {
  emit('update:modelValue', {
    gender: null,
    minAge: null,
    maxAge: null,
    company: null,
    city: null,
    country: null,
  })
}
</script>