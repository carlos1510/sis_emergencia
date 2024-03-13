<?php
namespace App\Http\Exports;
/**
 * Created by PhpStorm.
 * User: User
 * Date: 18/08/2021
 * Time: 09:40
 */

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use App\Http\Services\ReportesServices;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ReporteNominalEmergenciaExport implements FromCollection, WithHeadings, WithEvents, ShouldAutoSize, WithColumnFormatting, WithStyles
{
    protected $service;
    protected  $id_establecimiento;
    protected  $anio;
    protected  $mes;

    public function __construct($fecha_inicio, $fecha_final, $cod_2000)
    {
        $this->service = new ReportesServices();
        $this->cod_2000 = $cod_2000;
        $this->fecha_inicio = $fecha_inicio;
        $this->fecha_final = $fecha_final;
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true]],

            // Styling a specific cell by coordinate.
            //'B2' => ['font' => ['italic' => true]],

            // Styling an entire column.
            //'C'  => ['font' => ['size' => 16]],
        ];
    }

    public function headings(): array
    {
        // TODO: Implement headings() method.
        /*return[
            ['TITULO'],
            [
                'Nro Boleto',
                'Serie',
                'Nro',
                'Estado',
                'Núm de doc.'
            ]
        ];*/
        return ['Fecha Atencion', 'Hora Atencion', 'HC', 'Financiador', 'Edad', 'Tipo Edad', 'Tipo Doc', 'Nro Documento', 'Apellido Paterno', 'Apellido Materno', 'Nombres',
            'Direccion', 'Sexo', 'Telefono', 'Fecha Nacimiento', 'Tipo Doc Acomp', 'Nro Doc Acomp', 'Nombre Acomp', 'Telefono Acomp', 'Descripcion_motivo', 'Lugar Ocurrencia', 'UPS',
            'Condicion Salida',	'Fecha Salida', 'Hora Salida', 'DNI Profecional Atencion', 'Nombre Profesional Atención', 'Codigo DX1', 'Descripcion DX1', 'Tipo diagnostico DX1', 'Codigo DX2', 'Descripcion DX2',
            'Tipo Diagnostico DX2', 'Codigo DX3', 'Descripcion DX3', 'Tipo Diagnostico DX3', 'Codigo DX4', 'Descripcion DX4', 'Tipo Diagnostico DX4', 'Codigo Proc1', 'Descripcion Proc1', 'Codigo Proc2',
            'Descripcion Proc_2', 'Codigo Proc_3', 'Descripcion Proc_3', 'Codigo Proc_4', 'Descripcion Proc_4', 'Tipo Actividad', 'Presion Sistolica', 'Presion Diastolica', 'Presion arterial Media',
            'Saturacion Oxigeno', 'Frecuencia Cardiaca', 'Frecuencia Respiratoria', 'Temperatura', 'Area Atencion', 'DNI Profecional Del Proced.', 'Nombre Profecional Del Proced.', 'Cod_2000', 'Nombre Establecimiento', 'Microred', 'Red'];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                //$position_last = count($this->headings());

                //$column = Coordinate::stringFromColumnIndex($position_last);
                $columns = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ','BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ'];
                //$cells = "A1:{$column}1";
                $i = 1;
                foreach($columns as $column){
                    //dd($column);
                    $event->sheet->getColumnDimension($column)->setAutoSize(true);
                    //dd($column.$i);
                    $event->sheet->getDelegate()->getStyle($column.$i)->getFont()->setSize(12);
                }
                //$event->sheet->mergeCells($cells);
                //$event->sheet->setAutoSize(true);
                //$event->sheet->getDelegate()->getStyle($cells)->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
                //$event->sheet->getDelegate()->getStyle($cells)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

            }
        ];
    }

    public function columnFormats(): array
    {
        return [
            'B' => NumberFormat::FORMAT_TEXT
        ];
    }

    public function collection(){
        $dato['fecha_inicio'] = isset($this->fecha_inicio)?$this->fecha_inicio:null;
        $dato['fecha_final'] = isset($this->fecha_final)?$this->fecha_final:null;
        $dato['cod_2000'] = isset($this->cod_2000)?$this->cod_2000:null;
        $params = (array)$dato;

        $data = $this->service->reporteNominalEmergencia($params);
        $collection = collect($data);

        return $collection;
    }
}