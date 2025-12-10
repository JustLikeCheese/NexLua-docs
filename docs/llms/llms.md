<script setup>
import { ref, onMounted } from 'vue'

const data = ref('Loading...')

onMounted(async () => {
  const response = await fetch('/llms.txt')
  data.value = await response.text()
})
</script>

<a href="/llms.txt" download="llms.txt" class="download-link">
    Download llms.txt
</a>

```markdown-vue
{{ data }}
```