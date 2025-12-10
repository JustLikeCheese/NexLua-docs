<script setup>
import { ref, onMounted } from 'vue'

const data = ref('Loading...')

onMounted(async () => {
  const response = await fetch('/llms-full.txt')
  data.value = await response.text()
})
</script>

<a href="/llms-full.txt" download="llms-full.txt" class="download-link">
    Download llms-full.txt
</a>

```markdown-vue
{{ data }}
```